import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CeRawDataComponent } from './ce-raw-data.component';

describe('CeRawDataComponent', () => {
  let component: CeRawDataComponent;
  let fixture: ComponentFixture<CeRawDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CeRawDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CeRawDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
