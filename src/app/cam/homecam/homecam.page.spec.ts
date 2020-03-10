import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomecamPage } from './homecam.page';

describe('HomecamPage', () => {
  let component: HomecamPage;
  let fixture: ComponentFixture<HomecamPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomecamPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomecamPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
