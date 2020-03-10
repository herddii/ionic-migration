import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportactivityPage } from './reportactivity.page';

describe('ReportactivityPage', () => {
  let component: ReportactivityPage;
  let fixture: ComponentFixture<ReportactivityPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportactivityPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportactivityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
