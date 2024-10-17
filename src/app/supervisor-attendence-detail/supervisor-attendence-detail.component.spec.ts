import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisorAttendenceDetailComponent } from './supervisor-attendence-detail.component';

describe('SupervisorAttendenceDetailComponent', () => {
  let component: SupervisorAttendenceDetailComponent;
  let fixture: ComponentFixture<SupervisorAttendenceDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupervisorAttendenceDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupervisorAttendenceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
