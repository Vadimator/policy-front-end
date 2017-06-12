import { AppStore } from './../app.store';
import { UserReducer } from './../reducers/user.reducer';
import { Observable } from 'rxjs/Observable';
import { SecurityService } from './../security.service';
import { HttpClient } from './../http-client.service';
import { UserModel, IUser, UserStateModel } from './../../models/user.model';
import { Config } from '../config';
import { Injectable } from '@angular/core';


@Injectable()
export class UserService {

constructor(
        private _http: HttpClient,
        private _securityService: SecurityService,
        private appStore: AppStore,
    ) { }

    register(user: UserModel) {
        return this._http
        .post(`/registration`, user)
        .flatMap(() => { return this.login(user)});
    }


    login(user: UserModel) {
        return this._securityService.handleUserRequest(this._http
            .post('/api/login', user)
        ).flatMap(() => {
            return this.me();
        });;
    }

     me() {
        return this._http.get('/api/show/me').do((model: any) => {
            if (model.user) {
                this.setUser(model.user);
            }
        });
    }

     setUser(userModel: UserModel) {
        this.appStore.getStore().dispatch(<any>{type: UserReducer.SET_USER, user: userModel});
    }


     logout() {
        this._securityService.flushCredentials();
        this.appStore.getStore().dispatch(<any>{type: UserReducer.CLEAR_USER});
        return Observable.of(null);
    }

    isLogin(): boolean {
        return !!this.getUser().id;
    }

    getUser(): UserStateModel {
        return this.appStore.getState().user;
    }
}