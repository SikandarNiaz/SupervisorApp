import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePtcFileComponent } from './manage-ptc-file.component';

describe('ManagePtcFileComponent', () => {
  let component: ManagePtcFileComponent;
  let fixture: ComponentFixture<ManagePtcFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagePtcFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePtcFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
