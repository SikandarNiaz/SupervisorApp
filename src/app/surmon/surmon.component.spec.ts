import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurmonComponent } from './surmon.component';

describe('SurmonComponent', () => {
  let component: SurmonComponent;
  let fixture: ComponentFixture<SurmonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurmonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurmonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
