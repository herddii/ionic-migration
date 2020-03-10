import { TestBed } from '@angular/core/testing';

import { SamconceptService } from './samconcept.service';

describe('SamconceptService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SamconceptService = TestBed.get(SamconceptService);
    expect(service).toBeTruthy();
  });
});
