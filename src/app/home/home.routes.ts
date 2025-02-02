import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';


export const homeRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'manage-user',
        loadChildren: () =>
          import('../user-management/user-management.routes').then(
            (m) => m.userRoutes
          ),
      },
      {
        path: 'feedback',
        loadChildren: () =>
          import('../feedback/feedback.routes').then(
            (m) => m.feedbackRoutes
          ),
      },
      {
        path:'profile',
        loadChildren: () =>
          import('../profile/profile.routes').then(
            (m) => m.profileRoutes
          ),
      },
      {
        path:'support-dashboard',
        loadChildren: () =>
          import('../support-dashboard/support-dashboard.routes').then(
            (m) => m.supportDashboardRoutes
          ),
      },
      {
        path:'feedback-details/:categoryName',
        loadChildren: () =>
          import('../feedback-details/feedback-details.routes').then(
            (m) => m.feedbackDetailsRoutes
          ),
      },
      {
        path:'feedback-submissions/:id',
        loadChildren: () =>
          import('../feedback-submissions/feedback-submissions.routes').then(
            (m) => m.feedbackSubmissionsRoutes
          ),
      }
    ],
  },
];
