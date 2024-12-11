import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { authenticationGuard } from './authentication.guard';

export const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.routes').then((m) => m.homeRoutes),
    canActivate:[authenticationGuard]
  },
    {
      path: '',
      loadChildren: () =>
        import('./authentication/authentication.routes').then((m) => m.authRoutes),
    },
];       