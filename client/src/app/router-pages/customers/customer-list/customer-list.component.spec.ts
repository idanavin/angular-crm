import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerListComponent } from './customer-list.component';

describe('CostumerListComponent', () => {
  let component: CustomerListComponent;
  let fixture: ComponentFixture<CustomerListComponent>;
  CustomerListComponent
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
