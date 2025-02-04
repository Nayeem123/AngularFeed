import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChartDialogComponent } from './chart-dialog/chart-dialog.component';

@Component({
  selector: 'app-analytics',
  standalone: true,
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css'],
})
export class AnalyticsComponent {
  constructor(private dialog: MatDialog) {}

  openChart(title: string): void {
    this.dialog.open(ChartDialogComponent, {
      data: { title },
      width: '80%',
    });
  }
}