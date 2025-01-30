import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../../feedback.service';

@Component({
  selector: 'app-feedback-categories',
  imports: [NgFor],
  templateUrl: './feedback-categories.component.html',
  styleUrl: './feedback-categories.component.css',
})
export class FeedbackCategoriesComponent implements OnInit {

  constructor(private feedbackService: FeedbackService){}
  categories: any = [];
  ngOnInit(): void {
    // this.categories = [
    //   'Classroom Environments',
    //   'Teaching Methods',
    //   'Assignments',
    //   'Course content',
    // ];
    this.feedbackService.getFeedbackCategories().then((data:any)=>{
      this.categories = data.feedbackCategoryList
    })
  }

  openFeedbackForm(category :any){
console.log("Category:",category);

  }
}
