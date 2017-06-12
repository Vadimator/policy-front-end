import { AppStateReducers } from './reducers/app-state.reducer';
import { AppStateSerializerService } from './app-serializer.service';
import { AppStateModel } from './../models/app-state.model';
import { Injectable } from '@angular/core';
import { Store, createStore } from 'redux';

@Injectable()
export class AppStore {

    protected store: Store<AppStateModel>;

    constructor(
        private stateSerializer: AppStateSerializerService,
        private appStateReducers: AppStateReducers
    ) {
        this.store = <Store<AppStateModel>>createStore(
            this.appStateReducers.combineReducers(),
            this.stateSerializer.unserialize(),
            (<any>window).__REDUX_DEVTOOLS_EXTENSION__ && (<any>window).__REDUX_DEVTOOLS_EXTENSION__()
        );

        this.store.subscribe(() => {
            // Save model to storage
            this.stateSerializer.serialize(this.store.getState());
        });
    }

    getStore(): Store<AppStateModel> {
        return this.store;
    }

    getState(): AppStateModel {
        return Object.assign({}, this.store.getState());
    }
}