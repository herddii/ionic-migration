import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanydetPage } from './companydet.page';

describe('CompanydetPage', () => {
  let component: CompanydetPage;
  let fixture: ComponentFixture<CompanydetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanydetPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanydetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
