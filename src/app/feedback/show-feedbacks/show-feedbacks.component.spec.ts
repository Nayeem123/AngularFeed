import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowFeedbacksComponent } from './show-feedbacks.component';

describe('ShowFeedbacksComponent', () => {
  let component: ShowFeedbacksComponent;
  let fixture: ComponentFixture<ShowFeedbacksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowFeedbacksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowFeedbacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
