import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PmiHomeDetailComponent } from './pmi-home-detail.component';

describe('PmiHomeDetailComponent', () => {
  let component: PmiHomeDetailComponent;
  let fixture: ComponentFixture<PmiHomeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PmiHomeDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PmiHomeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
