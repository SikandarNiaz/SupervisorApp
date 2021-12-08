import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignTargetComponent } from './assign-target.component';

describe('AssignTargetComponent', () => {
  let component: AssignTargetComponent;
  let fixture: ComponentFixture<AssignTargetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignTargetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
