import { TestBed } from '@angular/core/testing';

import { DatapasserService } from './datapasser.service';

describe('DatapasserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatapasserService = TestBed.get(DatapasserService);
    expect(service).toBeTruthy();
  });
});
