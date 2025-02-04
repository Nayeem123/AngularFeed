import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FeedbackService } from '../../../feedback.service';

@Component({
  selector: 'app-create-questions',
  imports: [NgFor, FormsModule, NgIf],
  templateUrl: './create-questions.component.html',
  styleUrl: './create-questions.component.css'
})
export class CreateQuestionsComponent {

  questionsList: any = new Array();
  questionTest: any = {
    categoryName: '',
    isAnonymous: '',
    question: '',
    responseType: '',
    noOfOptions: '',
    optionsData: []
  };

  optionsForm: any = {
    'name': ''
  };

  selectedCategory: any;

  constructor(private feedbackService: FeedbackService){}

  ngOnInit(): void {
    this.selectedCategory = this.feedbackService.selectedCategory;
    console.log(this.selectedCategory);
  }

  addQuestion() {
    // Add in list
    let question = Object.assign({}, this.questionTest);
    this.questionsList.push(question);
    console.log(this.questionTest);
  }

  saveAllQuestions() {
    // Backend call
    let formData = {
      'category': this.selectedCategory.categoryName,
      'questions': this.questionsList
    }
    console.log(JSON.stringify(formData));
    this.feedbackService.addFeedback(formData).subscribe(
      () => {
        console.log('Category Added Successfully');
      },
      (error) => {
        console.error('Error adding category:', error);
      }
    );
  }

  prepareOptionsForm() {
    let optionsCount = this.questionTest.noOfOptions;
    if(optionsCount > 0) {
      this.questionTest.optionsData = [];
      for (let index = 0; index < optionsCount; index++) {
        this.questionTest.optionsData.push(Object.assign({}, this.optionsForm));
      }
    }
  }

  ngOnDestroy(): void {
    this.feedbackService.selectedCategory = {};
  }
}
