import { EventService } from './api/event.service';
import { ContractTypeService } from './api/contract-type.service';
import { UserGuard } from './guards/user.guard';
import { UserReducer } from './reducers/user.reducer';
import { SecurityReducer } from './reducers/security.reducer';
import { AppStateReducers } from './reducers/app-state.reducer';
import { LocalStorage } from './localstorage';
import { APP_STORAGE } from './storage.interface';
import { AppStateSerializerService } from './app-serializer.service';
import { AppStore } from './app.store';
import { SecurityService } from './security.service';
import { HttpClient } from './http-client.service';
import { ContractService } from './api/contract.service';
import { UserService } from './api/user.service';
import { NgModule, ModuleWithProviders } from '@angular/core';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */
@NgModule({})
export class ServiceModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: ServiceModule,
            providers: [
                HttpClient,
                UserService,
                ContractService,
                SecurityService,
                AppStore,
                AppStateSerializerService,
                {provide: APP_STORAGE, useClass: LocalStorage},
                AppStateReducers,
                SecurityReducer,
                UserReducer,
                UserGuard,
                EventService,
                ContractTypeService
            ]
        };
    }
}