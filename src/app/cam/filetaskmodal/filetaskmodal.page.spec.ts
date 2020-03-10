import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiletaskmodalPage } from './filetaskmodal.page';

describe('FiletaskmodalPage', () => {
  let component: FiletaskmodalPage;
  let fixture: ComponentFixture<FiletaskmodalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiletaskmodalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiletaskmodalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
