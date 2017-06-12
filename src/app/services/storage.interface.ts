import { OpaqueToken } from '@angular/core';

export let APP_STORAGE = new OpaqueToken('app.storage');

export interface StorageInterface {
    getItem(key: string): string;
    setItem(key: string, item: string): boolean;
    flush(key: string): boolean;
}
