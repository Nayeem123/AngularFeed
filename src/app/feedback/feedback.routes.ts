import { Routes } from '@angular/router';
import { FeedbackComponent } from './feedback.component';
import { ShowFeedbacksComponent } from './show-feedbacks/show-feedbacks.component';
import { AddFeedbackCategoriesComponent } from './add-feedback-categories/add-feedback-categories.component';
import { ViewFeedbackFormComponent } from './view-feedback-form/view-feedback-form.component';
import { FeedbackFormComponent } from './feedback-form/feedback-form.component';


export const feedbackRoutes: Routes = [
  { path: '',  component: FeedbackComponent},
  { path: 'showFeedback',  component: ShowFeedbacksComponent},
  { path: 'addFeedback',  component: AddFeedbackCategoriesComponent},
  { path: 'viewFeedbackForm',  component: ViewFeedbackFormComponent},
  { path: 'feedbackForm',  component: FeedbackFormComponent},
  
];
