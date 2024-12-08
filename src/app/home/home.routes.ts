import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { UserManagementComponent } from '../user-management/user-management.component';


export const homeRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'manage-user', component: UserManagementComponent },
];
