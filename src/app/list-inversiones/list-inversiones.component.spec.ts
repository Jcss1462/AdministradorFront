import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInversionesComponent } from './list-inversiones.component';

describe('ListInversionesComponent', () => {
  let component: ListInversionesComponent;
  let fixture: ComponentFixture<ListInversionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListInversionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListInversionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
