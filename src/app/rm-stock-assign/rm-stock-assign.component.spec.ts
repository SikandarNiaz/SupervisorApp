import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmStockAssignComponent } from './rm-stock-assign.component';

describe('RmStockAssignComponent', () => {
  let component: RmStockAssignComponent;
  let fixture: ComponentFixture<RmStockAssignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmStockAssignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmStockAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
