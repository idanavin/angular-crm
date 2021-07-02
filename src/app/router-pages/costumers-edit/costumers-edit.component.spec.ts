import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostumersEditComponent } from './costumers-edit.component';

describe('CostumersEditComponent', () => {
  let component: CostumersEditComponent;
  let fixture: ComponentFixture<CostumersEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CostumersEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CostumersEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
