import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CcProductivityReportComponent } from './cc-productivity-report.component';

describe('CcProductivityReportComponent', () => {
  let component: CcProductivityReportComponent;
  let fixture: ComponentFixture<CcProductivityReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CcProductivityReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CcProductivityReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
