import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feedback-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './support-dashboard.component.html',
  styleUrls: ['./support-dashboard.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SupportDashboardComponent {
  feedbackCategories: any[] = [
    {
      categoryName: 'Course content Feedback',
      openCount: 10,
      resolvedCount: 5,
    },
    {
      categoryName: 'Teaching Methods',
      openCount: 15,
      resolvedCount: 8,
    },
    {
      categoryName: 'Instructor Performance',
      openCount: 12,
      resolvedCount: 5,
    },
    {
      namcategoryNamee: 'Class Room Environment',
      openCount: 11,
      resolvedCount: 6,
    },
  ];

  comment: string = ''; // For resolution comments

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    // Load feedback categories from the server
    this.loadFeedbackCategories();
  }

  /**
   * Load feedback categories from the server
   */
  loadFeedbackCategories() {
    this.http.get<any[]>('http://localhost:8080/dashboard/sabid').subscribe({
      next: (categories) => {
        console.log(categories["data"]);
        this.feedbackCategories = categories["data"].map((category, index) => ({
          ...category,
        }));
      },
      error: (err) => {
        console.error('Error fetching feedback categories:', err);
      },
    });
  }

  /**
   * Get a card color dynamically based on the index.
   * @param index Index of the card
   * @returns Color string
   */
  getCardColor(index: number): string {
    const colors = ['green', 'orange', 'pink', 'blue'];
    return colors[index % colors.length];
  }

  /**
   * Redirect to the category details page
   * @param category Feedback category object
   */
  redirectToCategory(category: any) {
    console.log("I am working");
    this.router.navigate(['/home/feedback-details/' + category.categoryName]);
  }

  /**
   * Resolve feedback
   */
  resolveFeedback(feedbackId: number) {
    const resolvePayload = {
      feedbackId,
      comment: this.comment,
      status: 'Resolved',
    };

    this.http.post('http://localhost:8080/support/feedback/resolve', resolvePayload).subscribe({
      next: () => {
        console.log(`Feedback ID ${feedbackId} resolved successfully.`);
        this.comment = '';
      },
      error: (err) => {
        console.error('Error resolving feedback:', err);
      },
    });
  }

  /**
   * Placeholder for downloading resolved feedback
   */
  downloadResolvedFeedback() {
    console.log('Download resolved feedback logic to be implemented.');
  }

  /**
   * Generates a random HEX color
   * @returns {string} A random HEX color string
   */
  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
