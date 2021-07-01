import { TestBed } from '@angular/core/testing';

import { CostumerFormService } from './costumer-form.service';

describe('CostumerFormService', () => {
  let service: CostumerFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CostumerFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
