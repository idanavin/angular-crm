import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersFilterComponent } from './customers-filter.component';

describe('CustomersFilterComponent', () => {
  let component: CustomersFilterComponent;
  let fixture: ComponentFixture<CustomersFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomersFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
