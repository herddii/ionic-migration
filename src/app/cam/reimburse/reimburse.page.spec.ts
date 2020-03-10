import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReimbursePage } from './reimburse.page';

describe('ReimbursePage', () => {
  let component: ReimbursePage;
  let fixture: ComponentFixture<ReimbursePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReimbursePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReimbursePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
