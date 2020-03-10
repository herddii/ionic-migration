import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportcamPage } from './reportcam.page';

describe('ReportcamPage', () => {
  let component: ReportcamPage;
  let fixture: ComponentFixture<ReportcamPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportcamPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportcamPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
