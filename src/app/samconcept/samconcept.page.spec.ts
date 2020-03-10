import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SamconceptPage } from './samconcept.page';

describe('SamconceptPage', () => {
  let component: SamconceptPage;
  let fixture: ComponentFixture<SamconceptPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SamconceptPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SamconceptPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
