import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListamPage } from './listam.page';

describe('ListamPage', () => {
  let component: ListamPage;
  let fixture: ComponentFixture<ListamPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListamPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListamPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
