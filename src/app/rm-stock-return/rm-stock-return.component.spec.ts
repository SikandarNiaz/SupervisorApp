import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmStockReturnComponent } from './rm-stock-return.component';

describe('RmStockReturnComponent', () => {
  let component: RmStockReturnComponent;
  let fixture: ComponentFixture<RmStockReturnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmStockReturnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmStockReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
