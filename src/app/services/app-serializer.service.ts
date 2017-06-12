import { Injectable, Inject } from '@angular/core';
import { APP_STORAGE, StorageInterface } from './storage.interface';
import { AppStateModel } from './../models/app-state.model';

@Injectable()
export class AppStateSerializerService {

    static STORAGE_KEY: string = 'app_state';

    constructor(
        @Inject(APP_STORAGE) private storage: StorageInterface
    ) {}

    public unserialize() {
        let item: string = this.storage.getItem(AppStateSerializerService.STORAGE_KEY);
        let state: AppStateModel;
        if (item) {
             state = <AppStateModel>JSON.parse(item);
        } else {
            state = new AppStateModel();
        }
        return state;
    }

    public serialize(state: AppStateModel) {
        this.storage.setItem(AppStateSerializerService.STORAGE_KEY, JSON.stringify(state));
    }
}