import { Octokit } from '@octokit/core';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import action from '../src/action';
import { CustomOctokit } from '../src/octokit';

import { basicConfig } from './unit/config.fixture';

function setDefaultInputs() {
  // Path to configuration file
  vi.stubEnv('INPUT_CONFIG-PATH', '.github/downstream-backport-helper.yml');
  // GitHub token used to set issue labels
  vi.stubEnv('INPUT_TOKEN', 'mock-token');
}

const mocks = vi.hoisted(() => {
  const octokitCore = {
    '@octokit/core': {
      request: vi.fn(),
      config: {
        get: vi.fn(),
      },
    },
  };

  const actionsCore = {
    '@actions/core': {
      error: vi.fn(),
      setOutput: vi.fn(),
    },
  };

  const git = {
    git: {
      clone: vi.fn(),
      listBranches: vi.fn(),
      checkout: vi.fn(),
      log: vi.fn(),
      describe: vi.fn(),
    },
  };

  return {
    ...octokitCore,
    ...actionsCore,
    ...git,
  };
});

// Mock @octokit/core module
vi.mock('@octokit/core', () => {
  const Octokit = vi.fn(() => ({
    request: mocks['@octokit/core'].request,
    config: {
      get: mocks['@octokit/core'].config.get,
    },
  }));

  Octokit['plugin'] = vi.fn(() => Octokit);
  return { Octokit };
});

// Mock @actions/core module
vi.mock('@actions/core', async () => {
  const actual = await vi.importActual('@actions/core');
  return {
    ...(actual as any),
    error: mocks['@actions/core'].error,
    setOutput: mocks['@actions/core'].setOutput,
  };
});

// Mock @actions/github module
vi.mock('@actions/github', () => {
  vi.stubEnv(
    'GITHUB_REPOSITORY',
    'redhat-plumbers-in-action/downstream-backport-helper'
  );

  return {
    context: {
      repo: {
        owner: process.env['GITHUB_REPOSITORY']?.split('/')[0],
        repo: process.env['GITHUB_REPOSITORY']?.split('/')[1],
      },
      issue: {
        number: 1,
      },
    },
  };
});

vi.mock('issue-metadata', () => {
  const MetadataController = vi.fn(() => {
    return {
      setMetadata: vi.fn(),
      getMetadata: vi.fn(() => {
        return {
          commentID: undefined,
          data: [],
        };
      }),
    };
  });

  return { default: MetadataController };
});

describe('Integration tests - action.ts', () => {
  beforeEach(async () => {
    // Mock Action environment
    vi.stubEnv('RUNNER_DEBUG', '1');

    // Mock GitHub API
    vi.mocked(mocks['@octokit/core'].request).mockImplementation(path => {
      switch (path) {
        case 'GET /repos/{owner}/{repo}/pulls/{pull_number}':
          return {
            status: 200,
            data: {
              number: 1,
              head: { sha: 'd20d0c37d634a5303fa1e02edc9ea281897ba01a' },
            },
          };

        case 'POST /repos/{owner}/{repo}/issues/{issue_number}/comments':
          return {
            status: 200,
            data: {
              id: 1,
            },
          };

        case 'POST /repos/{owner}/{repo}/statuses/{sha}':
          return {
            status: 200,
            data: {},
          };

        default:
          throw new Error(`Unexpected endpoint: ${path}`);
      }
    });
  });

  afterEach(async () => {
    vi.restoreAllMocks();
    vi.unstubAllEnvs();
  });

  test('Basic', async () => {
    setDefaultInputs();

    vi.mocked(mocks['@octokit/core']).config.get.mockImplementation(
      async (params: { owner: string; repo: string; path: string }) => {
        expect(params).toMatchInlineSnapshot(`
          {
            "defaults": [Function],
            "owner": "redhat-plumbers-in-action",
            "path": ".github/downstream-backport-helper.yml",
            "repo": "downstream-backport-helper",
          }
        `);
        return Promise.resolve({ config: basicConfig });
      }
    );

    // Run action
    const octokit = new Octokit({ auth: 'mock-token' });
    await action(octokit as CustomOctokit);
  });
});
