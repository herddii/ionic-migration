import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AwalanPage } from './awalan.page';

describe('AwalanPage', () => {
  let component: AwalanPage;
  let fixture: ComponentFixture<AwalanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AwalanPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AwalanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
