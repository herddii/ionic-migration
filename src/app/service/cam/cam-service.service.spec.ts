import { TestBed } from '@angular/core/testing';

import { CamServiceService } from './cam-service.service';

describe('CamServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CamServiceService = TestBed.get(CamServiceService);
    expect(service).toBeTruthy();
  });
});
