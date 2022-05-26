import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSupervisorAttendenceComponent } from './update-supervisor-attendence.component';

describe('UpdateSupervisorAttendenceComponent', () => {
  let component: UpdateSupervisorAttendenceComponent;
  let fixture: ComponentFixture<UpdateSupervisorAttendenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateSupervisorAttendenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSupervisorAttendenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
function beforeEach(arg0: (done: any) => any) {
  throw new Error('Function not implemented.');
}

function expect(component: UpdateSupervisorAttendenceComponent) {
  throw new Error('Function not implemented.');
}

