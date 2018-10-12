import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorExercisesPage } from './doctor-exercises.page';

describe('DoctorExercisesPage', () => {
  let component: DoctorExercisesPage;
  let fixture: ComponentFixture<DoctorExercisesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorExercisesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorExercisesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
