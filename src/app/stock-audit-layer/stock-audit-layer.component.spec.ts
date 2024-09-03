import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockAuditLayerComponent } from './stock-audit-layer.component';

describe('StockAuditLayerComponent', () => {
  let component: StockAuditLayerComponent;
  let fixture: ComponentFixture<StockAuditLayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockAuditLayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockAuditLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
