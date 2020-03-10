import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcamPage } from './addcam.page';

describe('AddcamPage', () => {
  let component: AddcamPage;
  let fixture: ComponentFixture<AddcamPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddcamPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddcamPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
