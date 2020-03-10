import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatecardPage } from './ratecard.page';

describe('RatecardPage', () => {
  let component: RatecardPage;
  let fixture: ComponentFixture<RatecardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatecardPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatecardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
