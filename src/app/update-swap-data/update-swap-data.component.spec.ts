import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSwapDataComponent } from './update-swap-data.component';

describe('UpdateSwapDataComponent', () => {
  let component: UpdateSwapDataComponent;
  let fixture: ComponentFixture<UpdateSwapDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateSwapDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSwapDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
