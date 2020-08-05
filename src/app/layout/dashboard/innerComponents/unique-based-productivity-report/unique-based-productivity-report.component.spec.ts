import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniqueBasedProductivityReportComponent } from './unique-based-productivity-report.component';

describe('UniqueBasedProductivityReportComponent', () => {
  let component: UniqueBasedProductivityReportComponent;
  let fixture: ComponentFixture<UniqueBasedProductivityReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniqueBasedProductivityReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniqueBasedProductivityReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
