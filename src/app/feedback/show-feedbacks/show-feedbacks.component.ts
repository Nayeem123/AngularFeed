import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../../feedback.service';
import { NgFor, NgForOf, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddFeedbackCategoriesComponent } from '../add-feedback-categories/add-feedback-categories.component';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalserviceService } from '../../service/globalservice.service';

@Component({
  selector: 'app-show-feedbacks',
  imports: [NgFor, NgIf],
  templateUrl: './show-feedbacks.component.html',
  styleUrl: './show-feedbacks.component.css',
})
export class ShowFeedbacksComponent implements OnInit {
  feedBack: any = [];
  dataSource = new MatTableDataSource<any>([]);
  userfeedbackData: any;

  constructor(
    private feedbackService: FeedbackService,
    private router: Router,
    private dialog: MatDialog,
    public globalService: GlobalserviceService
  ) {}
  ngOnInit(): void {
    const feedBack = this.feedbackService.categoriesData;
    console.log('Feedback >>>>', feedBack);
    this.feedBack = feedBack?.feedbackCategoryList;
    if (!this.globalService.isAdmin) {
      this.showFeedback();
    }
  }
  addCategory() {
    const dialog = this.dialog.open(AddFeedbackCategoriesComponent, {
      width: '400px',
      height: 'auto',
      maxWidth: '400px',
      data: {
        mode: 'add',
      },
      panelClass: 'panel-cls',
    });

    dialog.afterClosed().subscribe(async (result: any) => {
      if (result) {
        await this.getFeedbackList();
        const feedBack = this.feedbackService.categoriesData;
        this.feedBack = feedBack.feedbackCategoryList;
      }
    });
  }

  getFeedbackList() {
    console.log('callled ???');

    return new Promise(async (resolve, reject) => {
      await this.feedbackService.getFeedbackCategories();
      resolve(true);
    });
  }

  showFeedback() {
    const userName = localStorage.getItem('userName');
    this.feedbackService.viewFeedback(userName).subscribe((data: any) => {
      this.userfeedbackData = data.feedbackDtoList
      console.log(data.feedbackDtoList)
    });
  }
}
