import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadTrainingComponent } from './upload-training.component';

describe('UploadTrainingComponent', () => {
  let component: UploadTrainingComponent;
  let fixture: ComponentFixture<UploadTrainingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadTrainingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
