import { Component, Inject, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Chart, registerables } from 'chart.js'; // ✅ Import registerables
import { CommonModule } from '@angular/common';

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
  chartData: any[] = [
    { "month": "January", "value": 65 },
    { "month": "February", "value": 59 },
    { "month": "March", "value": 80 },
    { "month": "April", "value": 81 }
  ];
  chartInstance: Chart | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { title: string },
    private http: HttpClient
  ) {
    Chart.register(...registerables); // ✅ Register all required components
  }

  ngOnInit() {
    this.fetchChartData();
  }

  ngAfterViewInit() {
    if (!this.loading && !this.error && this.chartData.length > 0) {
      this.renderChart();
    }
  }

  fetchChartData(): void {
    const apiUrl = `https://api.example.com/charts?title=${encodeURIComponent(this.data.title)}`;
    this.http.get(apiUrl).subscribe(
      (response: any) => {
        if (response && response.length > 0) {
          this.chartData = response;
          this.loading = false;
          this.renderChart();
        } else {
          this.error = 'No data available for the selected chart.';
          this.loading = false;
        }
      },
      (error) => {
        this.error = 'Failed to load chart data. Please try again later.';
        this.loading = false;
      }
    );
  }

  renderChart(): void {
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

          const labels = this.chartData.map((item: any) => item.month);
          const data = this.chartData.map((item: any) => item.value);

          this.chartInstance = new Chart(canvas, {
            type: 'bar', // Change to 'pie', 'line', etc., as needed
            data: {
              labels: labels,
              datasets: [
                {
                  label: 'Monthly Data',
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
