import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDoctorPage } from './create-doctor.page';

describe('CreateDoctorPage', () => {
  let component: CreateDoctorPage;
  let fixture: ComponentFixture<CreateDoctorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDoctorPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDoctorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
