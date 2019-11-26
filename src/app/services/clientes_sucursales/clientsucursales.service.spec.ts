import { TestBed } from '@angular/core/testing';

import { ClientsucursalesService } from './clientsucursales.service';

describe('ClientsucursalesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClientsucursalesService = TestBed.get(ClientsucursalesService);
    expect(service).toBeTruthy();
  });
});
