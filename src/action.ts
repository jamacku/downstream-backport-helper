import { z } from 'zod';

import { Config } from './config';
import { Git } from './git';
import {
  CustomOctokit,
  getCommitData,
  getPullRequestIntroducingCommit,
} from './octokit';
import { getArrayIndex, getCherryPicks } from './util';

import { Data, Downstream, prSchema } from './schema/output';

async function action(octokit: CustomOctokit): Promise<void> {
  const config = await Config.getConfig(octokit);

  let data: Downstream[] = [];

  for (const downstream of config.downstream) {
    const DownstreamOwnerAndRepo = `${downstream.owner}/${downstream.repo}`;
    const git = new Git(downstream['git-server'], DownstreamOwnerAndRepo);
    git.clone();
    const branches = git.listBranches(downstream.branches);

    let downstreamData: Downstream = {
      name: DownstreamOwnerAndRepo,
      alias: downstream['status-title'],
      commits: [],
    };

    for (const branch of branches) {
      git.checkout(branch);
      const commits = git.log(config.lookupInterval);

      for (const commit of commits) {
        const downstreamCommit = (
          await getCommitData(
            octokit,
            commit,
            downstream.owner,
            downstream.repo
          )
        ).data;

        const cherryPicks = getCherryPicks(downstreamCommit.commit.message);
        if (cherryPicks.length === 0) {
          continue;
        }

        // Identify upstream commit
        let upstreamCommit: string | undefined = undefined;
        for (const cherryPick of cherryPicks) {
          const { data, status } = await getCommitData(octokit, cherryPick);

          if (status !== 200) {
            continue;
          }

          upstreamCommit = cherryPick;
          // The first cherry-pick commit should be good enough.
          break;
        }

        // No upstream reference found
        if (!upstreamCommit) {
          continue;
        }

        // Identify upstream PR
        const prDataUnsafe = (
          await getPullRequestIntroducingCommit(octokit, upstreamCommit)
        ).data;

        const prDataParsed = z.array(prSchema).safeParse(prDataUnsafe);
        const prData = prDataParsed.success ? prDataParsed.data : [];

        downstreamData.commits.push({
          downstream: commit,
          upstream: upstreamCommit,
          branch: branch,
          tag: git.describe(commit),
          pr: Array.isArray(prData) ? prData[0] : undefined,
        });
      }
    }
    data.push(downstreamData);
  }

  let db: Data[] = [];

  for (const downstream of data) {
    for (const commit of downstream.commits) {
      if (!commit.hasOwnProperty('pr') || !commit.pr) {
        continue;
      }

      const index = getArrayIndex(db, 'pr', commit.pr.number);

      if (index === -1) {
        db.push({
          pr: commit.pr.number,
          downstream: [
            {
              name: downstream.name,
              alias: downstream.alias,
              commits: [commit],
            },
          ],
        });

        continue;
      }

      const downstreamIndex = getArrayIndex(
        db[index].downstream,
        'name',
        downstream.name
      );

      //? NOTE: downstreamIndex will never be -1 because it is initialized in the previous block

      db[index].downstream[downstreamIndex].commits.push(commit);
    }
  }

  // comment on PRs
  console.log(JSON.stringify(db, null, 2));
}

export default action;
