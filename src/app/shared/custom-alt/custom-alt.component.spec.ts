import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomAltComponent } from './custom-alt.component';

describe('CustomAltComponent', () => {
  let component: CustomAltComponent;
  let fixture: ComponentFixture<CustomAltComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomAltComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomAltComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
