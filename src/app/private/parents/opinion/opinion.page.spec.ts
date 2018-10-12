import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpinionPage } from './opinion.page';

describe('OpinionPage', () => {
  let component: OpinionPage;
  let fixture: ComponentFixture<OpinionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpinionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpinionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
