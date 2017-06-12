import { StorageInterface } from './storage.interface';

export class LocalStorage implements StorageInterface {
    getItem(key: string): string {
        return localStorage.getItem(key);
    }

    setItem(key: string, value: string): boolean {
        localStorage.setItem(key, value);
        return true;
    }

    flush(key: string): boolean {
        return this.setItem(key, '');
    }
}