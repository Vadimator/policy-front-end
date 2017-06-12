import { UserReducer } from './user.reducer';
import { SecurityReducer } from './security.reducer';
import { Injectable } from '@angular/core';
import { combineReducers } from 'redux';

@Injectable()
export class AppStateReducers {

    constructor(
        protected securityReducer: SecurityReducer,
        protected userReducer: UserReducer,
    ) {}

    combineReducers() {
        return combineReducers({
            [this.securityReducer.name()]: this.securityReducer.reducer.bind(this.securityReducer),
            [this.userReducer.name()]: this.userReducer.reducer.bind(this.userReducer)
        });
    }
}