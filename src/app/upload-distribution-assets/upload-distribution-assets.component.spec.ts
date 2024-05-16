import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadDistributionAssetsComponent } from './upload-distribution-assets.component';

describe('UploadDistributionAssetsComponent', () => {
  let component: UploadDistributionAssetsComponent;
  let fixture: ComponentFixture<UploadDistributionAssetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadDistributionAssetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadDistributionAssetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
