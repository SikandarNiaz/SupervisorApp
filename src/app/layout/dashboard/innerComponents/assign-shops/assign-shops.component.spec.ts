import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignShopsComponent } from './assign-shops.component';

describe('AssignShopsComponent', () => {
  let component: AssignShopsComponent;
  let fixture: ComponentFixture<AssignShopsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignShopsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignShopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
