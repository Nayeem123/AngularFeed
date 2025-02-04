import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../feedback.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AddFeedbackCategoriesComponent } from './add-feedback-categories/add-feedback-categories.component';
import { FeedbackCategoriesComponent } from './feedback-categories/feedback-categories.component';
import { ShowFeedbacksComponent } from './show-feedbacks/show-feedbacks.component';

@Component({
  selector: 'app-feedback',
  imports: [NgIf],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css',
})
export class FeedbackComponent implements OnInit {
  isAdmin: any;
  constructor(
    private feedbackService: FeedbackService,
    private router: Router,
    private dialog: MatDialog
  ) {}
  ngOnInit() {
    this.isAdmin = JSON.parse(localStorage.getItem('isAdmin') || 'null');
  }

  async feedbackCategories() {
    await this.feedbackService.getFeedbackCategories();
    this.router.navigate(['home', 'feedback', 'showFeedback']);
  }

  viewFeedbacks(data: any) {
    this.router.navigate(['home', 'feedback', 'viewFeedbackForm']);
  }

  postFeedback() {
    const dialog = this.dialog.open(FeedbackCategoriesComponent, {
      width: '400px',
      height: 'auto',
      maxWidth: '400px',
      data: {
        mode: 'add',
      },
      panelClass: 'panel-cls',
    });
  
    dialog.afterClosed().subscribe(async (result: any) => {
      if (result) {
        // Handle the result here if needed
      }
    });
  }
  

  alreadySubmittedFeedbacks() {
    const dialog = this.dialog.open(ShowFeedbacksComponent, {
      width: '600px',
      height: 'auto',
      maxWidth: '600px',
      data: {
        mode: 'add',
      },
      panelClass: 'panel-cls',
    });

    dialog.afterClosed().subscribe(async (result: any) => {
      if (result) {
      }
    });
  }
}
