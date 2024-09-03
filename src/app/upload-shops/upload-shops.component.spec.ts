import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadShopsComponent } from './upload-shops.component';

describe('UploadShopsComponent', () => {
  let component: UploadShopsComponent;
  let fixture: ComponentFixture<UploadShopsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadShopsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadShopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
