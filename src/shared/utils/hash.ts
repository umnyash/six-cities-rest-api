import * as crypto from 'node:crypto';

export function createSHA256(string: string, salt: string): string {
  const shaHasher = crypto.createHmac('sha256', salt);
  return shaHasher.update(string).digest('hex');
};
