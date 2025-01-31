import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../../feedback.service';
import { NgFor } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { FeedbackFormComponent } from '../feedback-form/feedback-form.component';

@Component({
  selector: 'app-view-feedback-form',
  imports: [NgFor],
  templateUrl: './view-feedback-form.component.html',
  styleUrl: './view-feedback-form.component.css',
})
export class ViewFeedbackFormComponent implements OnInit {
  feedBackFormData: any;
  constructor(private feedbackService: FeedbackService ,private dialog: MatDialog) {}
  ngOnInit(): void {
    this.getFeedBackFormsData();
  }
  getFeedBackFormsData() {
    this.feedbackService.viewAllFeedback().subscribe((data) => {
      this.feedBackFormData = data.feedbackDtoList;
      console.log(this.feedBackFormData);
    });
  }

  action(action: any,data:any) {
    if (action == 'view') {
      const dialog = this.dialog.open(FeedbackFormComponent, {
            width: '400px',
            height: 'auto',
            maxWidth: '400px',
            data: {
              mode: data,
            },
            panelClass: 'panel-cls',
          });
      
          dialog.afterClosed().subscribe(async (result: any) => {
            if (result) {
           console.log("VIEW DONE");
           
            }
          });
    } else {
    }
  }
}
