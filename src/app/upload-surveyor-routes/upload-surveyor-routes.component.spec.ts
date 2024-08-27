import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadSurveyorRoutesComponent } from './upload-surveyor-routes.component';

describe('UploadSurveyorRoutesComponent', () => {
  let component: UploadSurveyorRoutesComponent;
  let fixture: ComponentFixture<UploadSurveyorRoutesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadSurveyorRoutesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadSurveyorRoutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
