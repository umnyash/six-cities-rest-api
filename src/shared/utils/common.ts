export function parseBoolean(string: 'true' | 'false'): boolean {
  return string === 'true';
}

export function parseInteger(string: string): number {
  return Number.parseInt(string, 10);
}
