import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorDashboardPage } from './doctor-dashboard.page';

describe('DoctorDashboardPage', () => {
  let component: DoctorDashboardPage;
  let fixture: ComponentFixture<DoctorDashboardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorDashboardPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorDashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
