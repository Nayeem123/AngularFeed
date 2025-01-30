import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFeedbackCategoriesComponent } from './add-feedback-categories.component';

describe('AddFeedbackCategoriesComponent', () => {
  let component: AddFeedbackCategoriesComponent;
  let fixture: ComponentFixture<AddFeedbackCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddFeedbackCategoriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFeedbackCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
