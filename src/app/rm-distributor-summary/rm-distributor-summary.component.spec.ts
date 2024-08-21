import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmDistributorSummaryComponent } from './rm-distributor-summary.component';

describe('RmDistributorSummaryComponent', () => {
  let component: RmDistributorSummaryComponent;
  let fixture: ComponentFixture<RmDistributorSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmDistributorSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmDistributorSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
