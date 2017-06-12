import { EventNewComponent } from './components/event-new/event-new.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { SharedModule } from './../shared/shared.module';
import { ContractNewComponent } from './components/contract-new/contract-new.component';
import { ContractListComponent } from './components/contract-list/contract-list.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin.router';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        AdminRoutingModule,
        SharedModule
    ],
    exports: [
        AdminComponent,
        SidebarComponent,
        ContractListComponent,
        ContractNewComponent,
        EventListComponent,
        EventNewComponent
    ],
    declarations: [
        AdminComponent,
        SidebarComponent,
        ContractListComponent,
        ContractNewComponent,
        EventListComponent,
        EventNewComponent
    ],
    providers: [],
})
export class AdminModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: AdminModule,
            providers: []
        };
    }
}

