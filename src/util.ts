import { context } from '@actions/github';

export function getCherryPicks(message: string): string[] {
  const regexp = /\n\(cherry picked from commit (\b[0-9a-f]{5,40}\b)\)/g;

  const matches = [...message.matchAll(regexp)];
  return Array.isArray(matches)
    ? matches.map(match => match[1].toString())
    : [];
}

export function getArrayIndex<T>(
  array: T[],
  key: keyof T,
  value: T[keyof T]
): number {
  return array.findIndex(entry => entry[key] === value);
}

export function getCommitUrl(
  sha: string,
  repoFullName: string = `${context.repo.owner}/${context.repo.repo}`
): string {
  return `https://github.com/${repoFullName}/commit/${sha}`;
}

export function getBranchUrl(
  branch: string,
  repoFullName: string = `${context.repo.owner}/${context.repo.repo}`
): string {
  return `https://github.com/${repoFullName}/tree/${branch}`;
}

export function getTagUrl(
  tag: string,
  repoFullName: string = `${context.repo.owner}/${context.repo.repo}`
): string {
  return `https://github.com/${repoFullName}/releases/tag/${tag}`;
}
