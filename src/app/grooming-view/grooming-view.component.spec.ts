import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroomingViewComponent } from './grooming-view.component';

describe('GroomingViewComponent', () => {
  let component: GroomingViewComponent;
  let fixture: ComponentFixture<GroomingViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroomingViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroomingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
