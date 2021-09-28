import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersSortComponent } from './customers-sort.component';

describe('CustomersSortComponent', () => {
  let component: CustomersSortComponent;
  let fixture: ComponentFixture<CustomersSortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomersSortComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
