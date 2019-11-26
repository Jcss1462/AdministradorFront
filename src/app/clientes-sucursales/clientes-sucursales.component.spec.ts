import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesSucursalesComponent } from './clientes-sucursales.component';

describe('ClientesSucursalesComponent', () => {
  let component: ClientesSucursalesComponent;
  let fixture: ComponentFixture<ClientesSucursalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientesSucursalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientesSucursalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
