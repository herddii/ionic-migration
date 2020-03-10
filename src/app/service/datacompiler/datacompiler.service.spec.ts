import { TestBed } from '@angular/core/testing';

import { DatacompilerService } from './datacompiler.service';

describe('DatacompilerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatacompilerService = TestBed.get(DatacompilerService);
    expect(service).toBeTruthy();
  });
});
