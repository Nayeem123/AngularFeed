import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackSubmissionsComponent } from './feedback-submissions.component';

describe('FeedbackSubmissionsComponent', () => {
  let component: FeedbackSubmissionsComponent;
  let fixture: ComponentFixture<FeedbackSubmissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedbackSubmissionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedbackSubmissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
