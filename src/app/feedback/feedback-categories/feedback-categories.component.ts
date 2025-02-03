import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../../feedback.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FeedbackFormComponent } from '../feedback-form/feedback-form.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feedback-categories',
  imports: [NgFor],
  templateUrl: './feedback-categories.component.html',
  styleUrl: './feedback-categories.component.css',
})
export class FeedbackCategoriesComponent implements OnInit {
  constructor(
    private feedbackService: FeedbackService,
    private router: Router,
    private dialogRef: MatDialogRef<FeedbackCategoriesComponent>
  ) {}
  categories: any = [];
  ngOnInit(): void {
    // this.categories = [
    //   'Classroom Environments',
    //   'Teaching Methods',
    //   'Assignments',
    //   'Course content',
    // ];
    this.feedbackService.getFeedbackCategories().then((data: any) => {
      this.categories = data.feedbackCategoryList;
    });
  }

  openFeedbackForm(category: any) {
    console.log("category",category);
    
    this.router.navigate(['home', 'feedback', 'forms'], {
      queryParams: { category: category.categoryName } // Pass the category data
    });
    this.dialogRef.close(); //
  }
}
