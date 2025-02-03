import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  imports:[NgFor,NgIf],
  styleUrls: ['./feedback-form.component.css'],
})
export class FeedbackFormComponent implements OnInit {
  feedBackData: any; 

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.feedBackData = data.mode; 
  }

  ngOnInit(): void {
    console.log('Received Feedback Data:', this.feedBackData);
  }
}
