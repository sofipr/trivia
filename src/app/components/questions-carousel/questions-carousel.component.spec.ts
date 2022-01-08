import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsCarouselComponent } from './questions-carousel.component';

describe('QuestionsCarouselComponent', () => {
  let component: QuestionsCarouselComponent;
  let fixture: ComponentFixture<QuestionsCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionsCarouselComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
