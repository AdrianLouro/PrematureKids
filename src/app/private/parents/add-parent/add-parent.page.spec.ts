import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddParentPage } from './add-parent.page';

describe('AddParentPage', () => {
  let component: AddParentPage;
  let fixture: ComponentFixture<AddParentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddParentPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddParentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
