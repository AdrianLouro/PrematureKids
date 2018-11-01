import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateExercisePage } from './create-exercise.page';

describe('CreateExercisePage', () => {
  let component: CreateExercisePage;
  let fixture: ComponentFixture<CreateExercisePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateExercisePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateExercisePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
