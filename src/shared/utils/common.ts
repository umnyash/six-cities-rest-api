export function generateRandomBoolean(): boolean {
  return Boolean(generateRandomNumber(0, 1));
}

export function generateRandomNumber(min: number, max: number, fractionDigits = 0): number {
  const scale = Math.pow(10, fractionDigits);
  const scaledMin = min * scale;
  const scaledMax = max * scale;

  return (Math.floor(Math.random() * (scaledMax + 1 - scaledMin)) + scaledMin) / scale;
}

export function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : '';
}

export function getRandomItem<T>(items: T[]): T {
  return items[generateRandomNumber(0, items.length - 1)];
}

export function getRandomItems<T>(items: T[]): T[] {
  const start = generateRandomNumber(0, items.length - 1);
  const end = generateRandomNumber(start + 1, items.length);

  return items.slice(start, end);
}

export function parseBoolean(string: 'true' | 'false'): boolean {
  return string === 'true';
}

export function parseInteger(string: string): number {
  return Number.parseInt(string, 10);
}
