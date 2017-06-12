import { UserGuard } from './services/guards/user.guard';
import { AdminModule } from './admin/admin.module';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { Routes } from '@angular/router';

export const appRoutes: Routes = [
    { path: '', redirectTo: '/login',pathMatch: 'full'},
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule', canActivateChild: [ UserGuard ]},  
    { path: '**', component: PageNotFoundComponent }
];