import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingListPage } from './parking-list.page';

describe('ParkingListPage', () => {
  let component: ParkingListPage;
  let fixture: ComponentFixture<ParkingListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParkingListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkingListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
