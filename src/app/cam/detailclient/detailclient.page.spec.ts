import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailclientPage } from './detailclient.page';

describe('DetailclientPage', () => {
  let component: DetailclientPage;
  let fixture: ComponentFixture<DetailclientPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailclientPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailclientPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
