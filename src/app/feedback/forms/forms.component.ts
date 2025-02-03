import { NgClass, NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FeedbackService } from '../../feedback.service';

@Component({
  selector: 'app-forms',
  imports: [NgFor, FormsModule, NgIf],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.css',
})
export class FormsComponent implements OnInit {
  category: any;
  feedbackForm: any;
  feedBackCategory: any;
  formData: any = {};
  formSubmittedSuccessfully: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private feedbackService: FeedbackService
  ) {}

  ngOnInit(): void {
    // Retrieve query parameter 'category' from the URL
    this.route.queryParams.subscribe((params) => {
      console.log(params['category']);

      this.category = params['category']; // Assign category data
    });

    const JSONData = this.http
      .get('assets/json/feedback-form.json')
      .subscribe((data: any) => {
        const dataForm = data;
        const feedbackForms = dataForm.filter((feedback: any) => {
          console.log(feedback.category);

          return feedback.category == this.category;
        });
        this.feedBackCategory = feedbackForms[0].category;
        this.feedbackForm = feedbackForms[0].questions;
        console.log(feedbackForms);
      });
  }

  submitForm() {
    const allAnswered = this.feedbackForm.every(
      (form: { question: string | number }) =>
        this.formData[form.question] !== undefined &&
        this.formData[form.question] !== null
    );

    if (!allAnswered) {
      alert('Please answer all questions before submitting!');
      return; 
    }

    console.log(this.formData);

    const userName = localStorage.getItem('userName');

    const requestBody = {
      username: userName,
      categoryName: this.feedBackCategory,
      status: 'OPEN',
      questionAnswermap: this.formData,
      anonymous: false,
      priority: 'URGENT',
    };

    this.feedbackService.submitFeedbacks(requestBody).subscribe(
      (res) => {
        this.formSubmittedSuccessfully = true;
        const successMessageElement = document.getElementById('success-msg');
        if (successMessageElement) {
          successMessageElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
        console.log('Response:', res);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}
