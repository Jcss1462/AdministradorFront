import { TestBed } from '@angular/core/testing';

import { UssersService } from './ussers.service';

describe('UssersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UssersService = TestBed.get(UssersService);
    expect(service).toBeTruthy();
  });
});
