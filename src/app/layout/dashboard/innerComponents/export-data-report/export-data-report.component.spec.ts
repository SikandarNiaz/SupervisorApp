import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportDataReportComponent } from './export-data-report.component';

describe('ExportDataReportComponent', () => {
  let component: ExportDataReportComponent;
  let fixture: ComponentFixture<ExportDataReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportDataReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportDataReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
