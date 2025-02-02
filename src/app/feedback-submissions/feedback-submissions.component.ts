import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Feedback {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-feedback-submissions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './feedback-submissions.component.html',
  styleUrls: ['./feedback-submissions.component.css'],
})
export class FeedbackSubmissionsComponent implements OnInit {
  feedbackId: string = ''; // ID from the route
  username: string = '';
  fullName: string = '';
  comments: string = ''; // Comments field
  feedbackData: Feedback[] = []; // Question-Answer pairs
  selectedStatus: string = 'INPROGRESS'; // Default selected status
  feedbackName: string = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get the ID from the route
    this.route.paramMap.subscribe((params) => {
      this.feedbackId = params.get('id') || '';
      if (this.feedbackId) {
        this.fetchFeedbackDetails(this.feedbackId);
      }
    });
  }

  /**
   * Fetch feedback submission details based on ID
   */
  fetchFeedbackDetails(id: string): void {
    const apiUrl = `http://localhost:8080/feedback/submissions/${id}`;
    this.http.get<any>(apiUrl).subscribe(
      (response) => {
        console.log('API Response:', response);
        if (response.data) {
          this.username = response.data.username;
          this.fullName = response.data.fullName;
          this.feedbackData = response.data.feedback || []; // Assuming `feedback` contains question-answer pairs
          this.comments = response.data.comments || '';
          this.feedbackName = response.data.categoryName || '';
        } else {
          console.error('Invalid API response structure:', response);
        }
      },
      (error) => {
        console.error('Error fetching feedback details:', error);
      }
    );
  }

  /**
   * Submit feedback update
   */
  submitFeedback(status: string): void {
    this.selectedStatus = status;

    const updatePayload = {
      id: this.feedbackId,
      status: this.selectedStatus,
      remarks: this.comments,
    };

    const apiUrl = `http://localhost:8080/feedback/submissions/update`;
    this.http.post(apiUrl, updatePayload).subscribe(
      () => {
        console.log('Feedback updated successfully.');
        this.router.navigate(['/home/feedback-details/' + this.feedbackName]);
      },
      (error) => {
        console.error('Error updating feedback:', error);
      }
    );
  }

  /**
   * Change selected status
   */
  cancelBtn(): void {
    this.router.navigate(['/home/feedback-details/' + this.feedbackName]);
  }
  getMaskedUsername(username: string): string {
    return '*'.repeat(username.length);
  }
}
