export function setLocalStorageItem(key: string, value: string): void {
  localStorage.setItem(key, value);
}

export function getLocalStorageItem(key: string): string | null {
  return localStorage.getItem(key);
}

export function removeLocalStorageItem(key: string): void {
  localStorage.removeItem(key);
}

export function clearLocalStorage(): void {
  localStorage.clear();
}

export function setSessionStorageItem(key: string, value: string): void {
  sessionStorage.setItem(key, value);
}

export function getSessionStorageItem(key: string): string | null {
  return sessionStorage.getItem(key);
}

export function clearSessionStorage(): void {
  sessionStorage.clear();
}
