import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PmiHomeComponent } from './pmi-home.component';

describe('PmiHomeComponent', () => {
  let component: PmiHomeComponent;
  let fixture: ComponentFixture<PmiHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PmiHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PmiHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
