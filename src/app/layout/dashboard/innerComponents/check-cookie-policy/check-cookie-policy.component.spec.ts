import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckCookiePolicyComponent } from './check-cookie-policy.component';

describe('CheckCookiePolicyComponent', () => {
  let component: CheckCookiePolicyComponent;
  let fixture: ComponentFixture<CheckCookiePolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckCookiePolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckCookiePolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
