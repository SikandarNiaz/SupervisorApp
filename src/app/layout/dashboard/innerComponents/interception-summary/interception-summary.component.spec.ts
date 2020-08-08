import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterceptionSummaryComponent } from './interception-summary.component';

describe('InterceptionSummaryComponent', () => {
  let component: InterceptionSummaryComponent;
  let fixture: ComponentFixture<InterceptionSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterceptionSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterceptionSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
