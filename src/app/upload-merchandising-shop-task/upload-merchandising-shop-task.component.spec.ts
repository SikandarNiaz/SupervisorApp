import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadMerchandisingShopTaskComponent } from './upload-merchandising-shop-task.component';

describe('UploadMerchandisingShopTaskComponent', () => {
  let component: UploadMerchandisingShopTaskComponent;
  let fixture: ComponentFixture<UploadMerchandisingShopTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadMerchandisingShopTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadMerchandisingShopTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
