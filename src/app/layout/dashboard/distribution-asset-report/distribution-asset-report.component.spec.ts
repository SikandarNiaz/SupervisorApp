import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributionAssetReportComponent } from './distribution-asset-report.component';

describe('DistributionAssetReportComponent', () => {
  let component: DistributionAssetReportComponent;
  let fixture: ComponentFixture<DistributionAssetReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistributionAssetReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributionAssetReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
