import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalsamPage } from './modalsam.page';

describe('ModalsamPage', () => {
  let component: ModalsamPage;
  let fixture: ComponentFixture<ModalsamPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalsamPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalsamPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
