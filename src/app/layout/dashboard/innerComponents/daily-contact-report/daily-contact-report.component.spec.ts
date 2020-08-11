import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyContactReportComponent } from './daily-contact-report.component';

describe('DailyContactReportComponent', () => {
  let component: DailyContactReportComponent;
  let fixture: ComponentFixture<DailyContactReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyContactReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyContactReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
