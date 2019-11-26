import { TestBed } from '@angular/core/testing';

import { SubgastoService } from './subgasto.service';

describe('SubgastoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubgastoService = TestBed.get(SubgastoService);
    expect(service).toBeTruthy();
  });
});
