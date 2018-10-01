import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentAssignmentsPage } from './parent-assignments.page';

describe('ParentAssignmentsPage', () => {
  let component: ParentAssignmentsPage;
  let fixture: ComponentFixture<ParentAssignmentsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParentAssignmentsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentAssignmentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
