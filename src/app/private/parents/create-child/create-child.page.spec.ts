import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateChildPage } from './create-child.page';

describe('CreateChildPage', () => {
  let component: CreateChildPage;
  let fixture: ComponentFixture<CreateChildPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateChildPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateChildPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
