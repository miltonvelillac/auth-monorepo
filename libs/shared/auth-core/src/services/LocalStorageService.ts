import { type AuthStorageService } from '../contracts/auth.types';

export class LocalStorageService implements AuthStorageService {
  constructor(private readonly storage: Storage | null = resolveStorage()) {}

  getItem(key: string): string | null {
    if (!this.storage) {
      return null;
    }

    try {
      return this.storage.getItem(key);
    } catch {
      return null;
    }
  }

  setItem(key: string, value: string): boolean {
    if (!this.storage) {
      return false;
    }

    try {
      this.storage.setItem(key, value);
      return true;
    } catch {
      return false;
    }
  }

  removeItem(key: string): boolean {
    if (!this.storage) {
      return false;
    }

    try {
      this.storage.removeItem(key);
      return true;
    } catch {
      return false;
    }
  }

  clear(): boolean {
    if (!this.storage) {
      return false;
    }

    try {
      this.storage.clear();
      return true;
    } catch {
      return false;
    }
  }
}

function resolveStorage(): Storage | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    return window.localStorage;
  } catch {
    return null;
  }
}
