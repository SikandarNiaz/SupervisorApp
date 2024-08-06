import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockManagementSummeryComponent } from './stock-management-summery.component';

describe('StockManagementSummeryComponent', () => {
  let component: StockManagementSummeryComponent;
  let fixture: ComponentFixture<StockManagementSummeryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockManagementSummeryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockManagementSummeryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
