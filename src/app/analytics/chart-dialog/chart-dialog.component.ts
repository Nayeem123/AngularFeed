import { Component, Inject, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Chart, registerables } from 'chart.js'; // ✅ Import registerables
import { CommonModule } from '@angular/common';
import { FeedbackService } from '../../feedback.service';

@Component({
  selector: 'app-chart-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chart-dialog.component.html',
  styleUrls: ['./chart-dialog.component.css'],
})
export class ChartDialogComponent implements OnInit, AfterViewInit, OnDestroy {
  loading: boolean = true;
  error: string | null = null;
  // chartData: any[] = [
  //   { "month": "January", "value": 65 },
  //   { "month": "February", "value": 59 },
  //   { "month": "March", "value": 80 },
  //   { "month": "April", "value": 81 }
  // ];
  chartData: any[] = [];
  chartInstance: Chart | null = null;
  chartLabel: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { title: string },
    private http: HttpClient,
    private feedbackService: FeedbackService
  ) {
    Chart.register(...registerables); // ✅ Register all required components
  }

  ngOnInit() {
    this.fetchChartData();
  }

  ngAfterViewInit() {
    if (!this.loading && !this.error && this.chartData.length > 0) {
      this.renderChart(this.chartLabel);
    }
  }

  fetchChartData(): void {
    // const apiUrl = `https://api.example.com/charts?title=${encodeURIComponent(this.data.title)}`;
    // this.http.get(apiUrl).subscribe(
    //   (response: any) => {
    //     if (response && response.length > 0) {
    //       this.chartData = response;

    //     } else {
    //       this.error = 'No data available for the selected chart.';
    //       this.loading = false;
    //     }
    //   },
    //   (error) => {
    //     this.error = 'Failed to load chart data. Please try again later.';
    //     this.loading = false;
    //   }
    // );

    this.loading = false;
    this.feedbackService.getAnalyticsForCategories().subscribe((resp) => {
      this.loading = false;
      if (resp) {
        if(this.data.title == 'Feedback Submission Status') {
          this.prepareStatusCountData(resp);
        }
        else if(this.data.title == 'Feedback Urgency Trend') {
          this.prepareUrgencyTrendData(resp);
        }
        else if(this.data.title == 'Category-wise Feedback Count') {
          this.prepareSubmissionCountData(resp);
        }
        else if (this.data.title == 'Student Participation'){
          this.prepareStudentParticipationData(resp);
        }
      }
      else {
        this.error = 'No data available for the selected chart.';
      }
    });
  }

  private prepareSubmissionCountData(resp) {
    let dataMap = {};
    let labels = resp.feedbackDtoList.map((item: any) => item.categoryName);
    for (let index = 0; index < labels.length; index++) {
      const element = labels[index];
      dataMap[element] = 0;
    }

    for (let index = 0; index < resp.feedbackDtoList.length; index++) {
      const element = resp.feedbackDtoList[index];
      let count = dataMap[element.categoryName];
      if (count < 1) {
        count = 0;
      }
      count = count + 1;
      dataMap[element.categoryName] = count;
    }

    this.chartData = Object.entries(dataMap).map(([key, value]) => ({
      name: key,
      value: value
    }));

    this.renderChart(this.chartLabel);
  }

  private prepareUrgencyTrendData(resp) {
    let dataMap = {};
    let labels = resp.feedbackDtoList.map((item: any) => item.priority);
    for (let index = 0; index < labels.length; index++) {
      const element = labels[index];
      dataMap[element] = 0;
    }

    for (let index = 0; index < resp.feedbackDtoList.length; index++) {
      const element = resp.feedbackDtoList[index];
      let count = dataMap[element.priority];
      if (count < 1) {
        count = 0;
      }
      count = count + 1;
      dataMap[element.priority] = count;
    }

    this.chartData = Object.entries(dataMap).map(([key, value]) => ({
      name: key,
      value: value
    }));

    this.renderChart(this.chartLabel);
  }

  private prepareStatusCountData(resp) {
    let dataMap = {};
    let labels = resp.feedbackDtoList.map((item: any) => item.status);
    for (let index = 0; index < labels.length; index++) {
      const element = labels[index];
      dataMap[element] = 0;
    }

    for (let index = 0; index < resp.feedbackDtoList.length; index++) {
      const element = resp.feedbackDtoList[index];
      let count = dataMap[element.status];
      if (count < 1) {
        count = 0;
      }
      count = count + 1;
      dataMap[element.status] = count;
    }

    this.chartData = Object.entries(dataMap).map(([key, value]) => ({
      name: key,
      value: value
    }));

    this.renderChart(this.chartLabel);
  }

  private prepareStudentParticipationData(resp) {
    let dataMap = {};
    let labels = resp.feedbackDtoList.map((item: any) => item.username);
    for (let index = 0; index < labels.length; index++) {
      const element = labels[index];
      dataMap[element] = 0;
    }

    for (let index = 0; index < resp.feedbackDtoList.length; index++) {
      const element = resp.feedbackDtoList[index];
      let count = dataMap[element.username];
      if (count < 1) {
        count = 0;
      }
      count = count + 1;
      dataMap[element.username] = count;
    }

    this.chartData = Object.entries(dataMap).map(([key, value]) => ({
      name: key,
      value: value
    }));

    this.renderChart(this.chartLabel);
  }

  renderChart(labelTxt: string): void {
    setTimeout(() => {
      const container = document.getElementById('chart-container-wrapper');

      if (container) {
        // Remove existing canvas if it exists
        container.innerHTML = '<canvas id="chart-container"></canvas>';
        const canvas = document.getElementById('chart-container') as HTMLCanvasElement;

        if (canvas && this.chartData.length > 0) {
          // Destroy previous chart instance if it exists
          if (this.chartInstance) {
            this.chartInstance.destroy();
          }

          const labels = this.chartData.map((item: any) => item.name);
          const data = this.chartData.map((item: any) => item.value);

          this.chartInstance = new Chart(canvas, {
            type: 'doughnut', // Change to 'pie', 'line', etc., as needed
            data: {
              labels: labels,
              datasets: [
                {
                  label: labelTxt,
                  data: data,
                  backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
                },
              ],
            },
            options: {
              responsive: true,
              plugins: {
                legend: {
                  display: true,
                  position: 'top',
                },
              },
            },
          });
        } else {
          console.error('Canvas element not found or data is empty!');
        }
      } else {
        console.error('Chart container wrapper not found!');
      }
    }, 100); // Short delay to ensure DOM is ready
  }

  ngOnDestroy() {
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
  }
}
