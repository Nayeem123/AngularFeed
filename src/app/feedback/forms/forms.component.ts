import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FeedbackService } from '../../feedback.service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forms',
  imports: [NgFor, FormsModule, NgIf],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.css',
})
export class FormsComponent implements OnInit {
  category: any;
  feedbackForm: any = [];
  feedBackCategory: any;
  formData: any = {};
  formSubmittedSuccessfully: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private feedbackService: FeedbackService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.category = params['category'];
    });

    this.http.get('assets/json/feedback-form.json').subscribe((data: any) => {
      const feedbackData = data.data;
      if (feedbackData && feedbackData.questionResponses) {
        this.feedBackCategory = feedbackData.category;
        this.feedbackForm = feedbackData.questionResponses;
      }
    });
  }

  // Handle checkbox selection
  updateCheckboxSelection(question: string, option: string, event: any): void {
    if (!this.formData[question]) {
      this.formData[question] = [];
    }

    if (event.target.checked) {
      // Add option to the array if checked
      this.formData[question].push(option);
    } else {
      // Remove option from the array if unchecked
      this.formData[question] = this.formData[question].filter(
        (item: string) => item !== option
      );
    }
  }

  // Submit Form
  submitForm() {
    const allAnswered = this.feedbackForm.every((form: any) => {
      if (form.responseType === 'checkbox') {
        return (
          this.formData[form.question] &&
          this.formData[form.question].length > 0
        );
      }
      return (
        this.formData[form.question] !== undefined &&
        this.formData[form.question] !== null
      );
    });

    if (!allAnswered) {
      alert('Please answer all questions before submitting!');
      return;
    }

    const userName = localStorage.getItem('userName');

    const requestBody = {
      username: userName,
      categoryName: this.feedBackCategory,
      status: 'OPEN',
      questionAnswermap: this.formData,
      anonymous: this.formData.anonymous || false,
      priority: this.formData.priority || 'Low', // Default priority
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
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  // Reset Form
  resetForm() {
    this.formData = {};
  }
}
