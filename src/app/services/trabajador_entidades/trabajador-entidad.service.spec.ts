import { TestBed } from '@angular/core/testing';

import { TrabajadorEntidadService } from './trabajador-entidad.service';

describe('TrabajadorEntidadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TrabajadorEntidadService = TestBed.get(TrabajadorEntidadService);
    expect(service).toBeTruthy();
  });
});
