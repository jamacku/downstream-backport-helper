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
