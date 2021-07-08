import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadCardsComponent } from './head-cards.component';

describe('HeadCardsComponent', () => {
  let component: HeadCardsComponent;
  let fixture: ComponentFixture<HeadCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeadCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
