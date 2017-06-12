import { EventNewComponent } from './components/event-new/event-new.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { ContractNewComponent } from './components/contract-new/contract-new.component';
import { ContractListComponent } from './components/contract-list/contract-list.component';
import { AdminComponent } from './admin.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: AdminComponent,
        children: [
          { path: '', redirectTo: 'contracts', pathMatch: 'full'}, // Force redirect
          { path: 'contracts', component: ContractListComponent },
          { path: 'contract/new', component: ContractNewComponent },
          { path: 'events', component: EventListComponent },
          { path: 'event/new', component: EventNewComponent }
        //   { path: 'payment', component: PaymentComponent },
        //   { path: 'social-media', component: SocialMediaComponent}
        ]
      }
    //   { path: 'info/:id', component: ProfileInfoComponent}
    ])
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
