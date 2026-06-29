export function formatDate(daysFromNow = 0): string {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date.toISOString().split('T')[0];
}

export function formatDateDisplay(daysFromNow = 0): string {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export function generatePhone(): string {
  const num = Math.floor(1000000000 + Math.random() * 9000000000);
  return `+1${num}`;
}

export function generatePassword(length = 12): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$';
  let result = '';
  for (let i = 0; i < length; i += 1) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function generateUsername(prefix = 'user'): string {
  return `${prefix}_${Date.now()}`;
}
