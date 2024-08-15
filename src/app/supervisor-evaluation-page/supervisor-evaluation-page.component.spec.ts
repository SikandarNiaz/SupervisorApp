import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisorEvaluationPageComponent } from './supervisor-evaluation-page.component';

describe('SupervisorEvaluationPageComponent', () => {
  let component: SupervisorEvaluationPageComponent;
  let fixture: ComponentFixture<SupervisorEvaluationPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupervisorEvaluationPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupervisorEvaluationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
