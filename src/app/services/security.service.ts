import { UserReducer } from './reducers/user.reducer';
import { SecurityReducer } from './reducers/security.reducer';
import { Observable } from 'rxjs/Observable';
import { SecurityModel } from './../models/security.model';
import { AppStore } from './app.store';
import { Injectable } from '@angular/core';


@Injectable()
export class SecurityService {

    constructor(
        private appStore: AppStore
    ) {}

    saveAccessToken(accessToken: string) {
        this.appStore.getStore().dispatch(<any>{type: SecurityReducer.SET_ACCESS_TOKEN, accessToken});
    }

    saveRefreshToken(refreshToken: string) {
        this.appStore.getStore().dispatch(<any>{type: SecurityReducer.SET_REFRESH_TOKEN, refreshToken});
    }

    getAccessToken(): string {
        return this.appStore.getState().security.accessToken;
    }

    getRefreshToken(): string {
        return this.appStore.getState().security.refreshToken;
    }

    storeCredentials(securityModel: SecurityModel) {
        this.saveAccessToken(securityModel.accessToken);
        this.saveRefreshToken(securityModel.refreshToken);
    }

    flushCredentials() {
        this.saveAccessToken(null);
        this.saveRefreshToken(null);
        this.appStore.getStore().dispatch(<any>{type: UserReducer.CLEAR_USER});
    }

    getSecurityModel(): SecurityModel {
        return <SecurityModel>{
            accessToken: this.getAccessToken(),
            refreshToken: this.getRefreshToken()
        };
    }

    handleUserRequest(request$: Observable<any>) {
        return request$.map((res: {token: string, refresh_token: string}) => {

            let securityModel: SecurityModel = <SecurityModel>{
                accessToken: res.token,
                refreshToken: res.refresh_token
            };
            this.storeCredentials(securityModel);

            return securityModel;
        });
    }
}