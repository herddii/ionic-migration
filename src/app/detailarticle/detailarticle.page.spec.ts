import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailarticlePage } from './detailarticle.page';

describe('DetailarticlePage', () => {
  let component: DetailarticlePage;
  let fixture: ComponentFixture<DetailarticlePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailarticlePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailarticlePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
