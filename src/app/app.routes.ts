import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    {
      path: '',
      loadChildren: () =>
        import('./authentication/authentication.routes').then((m) => m.authRoutes),
    },
    {
      path: 'home',
      loadChildren: () =>
        import('./home/home.routes').then((m) => m.homeRoutes),
    },
];       