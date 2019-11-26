import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubgastoComponent } from './subgasto.component';

describe('SubgastoComponent', () => {
  let component: SubgastoComponent;
  let fixture: ComponentFixture<SubgastoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubgastoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubgastoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
