import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersInputComponent } from './customers-input.component';

describe('CustomersInputComponent', () => {
  let component: CustomersInputComponent;
  let fixture: ComponentFixture<CustomersInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomersInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
