import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEntertainmentPage } from './add-entertainment.page';

describe('AddEntertainmentPage', () => {
  let component: AddEntertainmentPage;
  let fixture: ComponentFixture<AddEntertainmentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEntertainmentPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEntertainmentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
