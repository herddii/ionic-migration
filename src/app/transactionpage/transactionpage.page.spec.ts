import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionpagePage } from './transactionpage.page';

describe('TransactionpagePage', () => {
  let component: TransactionpagePage;
  let fixture: ComponentFixture<TransactionpagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionpagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionpagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
