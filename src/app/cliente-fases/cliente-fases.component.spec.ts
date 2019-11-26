import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteFasesComponent } from './cliente-fases.component';

describe('ClienteFasesComponent', () => {
  let component: ClienteFasesComponent;
  let fixture: ComponentFixture<ClienteFasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClienteFasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteFasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
