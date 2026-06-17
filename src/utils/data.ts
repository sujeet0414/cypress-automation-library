export function generateEmail(prefix = 'test'): string {
  const timestamp = Date.now();
  return `${prefix}+${timestamp}@example.com`;
}

export function generateString(length = 8): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i += 1) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function randomNumber(min = 1, max = 100): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
