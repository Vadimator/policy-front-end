import { AppStateReducerInterface } from './../../models/app-state-reducer.interface';
import { SecurityModel } from './../../models/security.model';
import { Injectable } from '@angular/core';


@Injectable()
export class SecurityReducer implements AppStateReducerInterface {

    public static SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';
    public static SET_REFRESH_TOKEN = 'SET_REFRESH_TOKEN';

    public name(): string {
        return 'security';
    }

    public reducer(state = new SecurityModel(), action: any) {
        switch (action.type) {
            case SecurityReducer.SET_ACCESS_TOKEN:
                return Object.assign({}, state, {accessToken: action.accessToken});
            case SecurityReducer.SET_REFRESH_TOKEN:
                return Object.assign({}, state, {refreshToken: action.refreshToken});
            default:
                return state;
        }
    }
}