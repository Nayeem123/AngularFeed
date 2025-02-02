import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface FeedbackDetail {
  id: number;
  anonymous: boolean;
  priority: string;
  categoryName: string;
  status: string;
  username: string;
}

@Component({
  selector: 'app-feedback-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feedback-details.component.html',
  styleUrls: ['./feedback-details.component.css'],
})
export class FeedbackDetailsComponent implements OnInit {
  // Route parameter
  categoryName: string = '';

  // Summary counts
  openCount = 0;
  resolvedCount = 0;

  // Priority counts
  urgentCount = 0;
  mediumCount = 0;
  lowCount = 0;

  // Feedback list
  feedbackDetails: FeedbackDetail[] = [];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get category name from route
    this.route.paramMap.subscribe((params) => {
      this.categoryName = params.get('categoryName') || '';
      this.fetchFeedbackDetails(this.categoryName);
    });
  }

  // Fetch feedback details from API
  fetchFeedbackDetails(categoryName: string): void {
    // Replace the URL with your actual API endpoint
    const apiUrl = `http://localhost:8080/feedback/categories/${categoryName}`;
    this.http.get<any>(apiUrl).subscribe(
      (response) => {
        if (response.data) {
          const data = response.data; // Correctly access the nested `data`
          this.feedbackDetails = data.feedbackDetails || [];
          this.openCount = data.openCount || 0;
          this.resolvedCount = data.resolvedCount || 0;
          this.urgentCount = data.urgentCount || 0;
          this.mediumCount = data.mediumCount || 0;
          this.lowCount = data.lowCount || 0;
        } else {
          console.error('API response does not contain "data" property:', response);
        }
      },
      (error) => {
        console.error('Error fetching feedback details:', error);
      }
    );
  }

  // Redirect logic
  redirectToDetails(status: string): void {
    // Navigate to feedback status details page
    this.router.navigate(['/feedback-status', status]);
  }

  getMaskedUsername(username: string): string {
    return '*'.repeat(username.length);
  }

  handleStatusClick(feedback: any): void {
    console.log("I am clicked");
    this.router.navigate(['/home/feedback-submissions/' + feedback.id]);
  }
  
}
