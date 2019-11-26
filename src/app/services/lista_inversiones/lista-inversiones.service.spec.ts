import { TestBed } from '@angular/core/testing';

import { ListaInversionesService } from './lista-inversiones.service';

describe('ListaInversionesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListaInversionesService = TestBed.get(ListaInversionesService);
    expect(service).toBeTruthy();
  });
});
