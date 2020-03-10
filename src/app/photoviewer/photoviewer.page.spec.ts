import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoviewerPage } from './photoviewer.page';

describe('PhotoviewerPage', () => {
  let component: PhotoviewerPage;
  let fixture: ComponentFixture<PhotoviewerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoviewerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoviewerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
