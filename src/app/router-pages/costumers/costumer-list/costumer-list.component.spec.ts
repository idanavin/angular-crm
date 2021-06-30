import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostumerListComponent } from './costumer-list.component';

describe('CostumerListComponent', () => {
  let component: CostumerListComponent;
  let fixture: ComponentFixture<CostumerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CostumerListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CostumerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
