import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchandiserAttendenceDetailComponent } from './merchandiser-attendence-detail.component';

describe('MerchandiserAttendenceDetailComponent', () => {
  let component: MerchandiserAttendenceDetailComponent;
  let fixture: ComponentFixture<MerchandiserAttendenceDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MerchandiserAttendenceDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchandiserAttendenceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
