import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewdetailPage } from './viewdetail.page';

describe('ViewdetailPage', () => {
  let component: ViewdetailPage;
  let fixture: ComponentFixture<ViewdetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewdetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewdetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
