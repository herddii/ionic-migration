import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalbuPage } from './modalbu.page';

describe('ModalbuPage', () => {
  let component: ModalbuPage;
  let fixture: ComponentFixture<ModalbuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalbuPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalbuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
