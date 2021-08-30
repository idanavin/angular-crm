import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersFilterSlideComponent } from './customers-filter-slide.component';

describe('CustomersFilterSlideComponent', () => {
  let component: CustomersFilterSlideComponent;
  let fixture: ComponentFixture<CustomersFilterSlideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomersFilterSlideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersFilterSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
