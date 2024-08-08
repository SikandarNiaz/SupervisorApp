import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockIssueToRmComponent } from './stock-issue-to-rm.component';

describe('StockIssueToRmComponent', () => {
  let component: StockIssueToRmComponent;
  let fixture: ComponentFixture<StockIssueToRmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockIssueToRmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockIssueToRmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
