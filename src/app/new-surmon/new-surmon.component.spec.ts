import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSurmonComponent } from './new-surmon.component';

describe('NewSurmonComponent', () => {
  let component: NewSurmonComponent;
  let fixture: ComponentFixture<NewSurmonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSurmonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSurmonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
