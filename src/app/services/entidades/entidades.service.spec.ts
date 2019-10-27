import { TestBed } from '@angular/core/testing';

import { EntidadesService } from './entidades.service';

describe('EntidadesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EntidadesService = TestBed.get(EntidadesService);
    expect(service).toBeTruthy();
  });
});
