import { TestBed } from '@angular/core/testing';

import { SaleskitService } from './saleskit.service';

describe('SaleskitService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SaleskitService = TestBed.get(SaleskitService);
    expect(service).toBeTruthy();
  });
});
