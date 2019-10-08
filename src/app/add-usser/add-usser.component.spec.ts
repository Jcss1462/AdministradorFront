import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUsserComponent } from './add-usser.component';

describe('AddUsserComponent', () => {
  let component: AddUsserComponent;
  let fixture: ComponentFixture<AddUsserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUsserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUsserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
