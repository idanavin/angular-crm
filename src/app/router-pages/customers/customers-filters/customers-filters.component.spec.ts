import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersFiltersComponent } from './customers-filters.component';

describe('CustomersFiltersComponent', () => {
  let component: CustomersFiltersComponent;
  let fixture: ComponentFixture<CustomersFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomersFiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
