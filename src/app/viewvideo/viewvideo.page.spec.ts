import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewvideoPage } from './viewvideo.page';

describe('ViewvideoPage', () => {
  let component: ViewvideoPage;
  let fixture: ComponentFixture<ViewvideoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewvideoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewvideoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
