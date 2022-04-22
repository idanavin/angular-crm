import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { CardComponent } from './card.component';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let de: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not have header and subHeader', () => {
    expect(component.header).toBeUndefined();
    expect(component.subHeader).toBeUndefined();
  });

  it('should have header and subHeader', () => {
    component.header = 'header';
    component.subHeader = 'subHeader';
    fixture.detectChanges();

    de = fixture.debugElement.query(By.css('.header'));
    expect(de.nativeElement.textContent).toContain('header');

    de = fixture.debugElement.query(By.css('.sub-header'));
    expect(de.nativeElement.textContent).toContain('subHeader');
  });
});
