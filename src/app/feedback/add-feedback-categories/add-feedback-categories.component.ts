import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FeedbackService } from '../../feedback.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-feedback-categories',
  imports: [FormsModule],
  templateUrl: './add-feedback-categories.component.html',
  styleUrl: './add-feedback-categories.component.css',
})
export class AddFeedbackCategoriesComponent implements OnInit {
  feedbackCategory: string = '';
  feedbackSubCategory: string = '';
  constructor(private feedbackService: FeedbackService,private dialogRef: MatDialogRef<AddFeedbackCategoriesComponent>) {}
  ngOnInit(): void {}

  createCategory() {
    const requestBody = {
      categoryName: this.feedbackCategory,
      categoryDesc: this.feedbackSubCategory,
    };

    this.feedbackService.addFeedback(requestBody).subscribe(
      () => {
        console.log('Category Added Successfully');
        // Close the dialog and return a success result to the parent component
        this.dialogRef.close(true);
      },
      (error) => {
        console.error('Error adding category:', error);
        // You can handle errors here (e.g., show a toast or alert)
        this.dialogRef.close(false); // Close with false if error occurs
      }
    );
  }
}
