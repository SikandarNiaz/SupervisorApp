import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockReturnFromRmComponent } from './stock-return-from-rm.component';

describe('StockReturnFromRmComponent', () => {
  let component: StockReturnFromRmComponent;
  let fixture: ComponentFixture<StockReturnFromRmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockReturnFromRmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockReturnFromRmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
