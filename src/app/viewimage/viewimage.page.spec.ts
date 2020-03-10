import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewimagePage } from './viewimage.page';

describe('ViewimagePage', () => {
  let component: ViewimagePage;
  let fixture: ComponentFixture<ViewimagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewimagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewimagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
