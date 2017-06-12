import { AppStateReducerInterface } from './../../models/app-state-reducer.interface';
import { UserStateModel } from './../../models/user.model';
import { Injectable } from '@angular/core';

@Injectable()
export class UserReducer implements AppStateReducerInterface {

    public static SET_USER = 'SET_USER';
    public static CLEAR_USER = 'CLEAR_USER';

    public name(): string {
        return 'user';
    }

    public reducer(state = new UserStateModel(), action: any) {
        switch (action.type) {
            case UserReducer.SET_USER:
                return Object.assign({}, state, action.user);
            case UserReducer.CLEAR_USER:
                return Object.assign({}, new UserStateModel());
            default:
                return state;
        }
    }
}
