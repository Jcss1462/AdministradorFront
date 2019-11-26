import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesProyectosComponent } from './clientes-proyectos.component';

describe('ClientesProyectosComponent', () => {
  let component: ClientesProyectosComponent;
  let fixture: ComponentFixture<ClientesProyectosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientesProyectosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientesProyectosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
