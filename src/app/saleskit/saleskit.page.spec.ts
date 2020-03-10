import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleskitPage } from './saleskit.page';

describe('SaleskitPage', () => {
  let component: SaleskitPage;
  let fixture: ComponentFixture<SaleskitPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleskitPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleskitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
