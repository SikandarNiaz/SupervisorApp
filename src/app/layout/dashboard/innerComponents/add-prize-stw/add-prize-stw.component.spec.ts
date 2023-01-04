import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPrizeStwComponent } from './add-prize-stw.component';

describe('AddPrizeStwComponent', () => {
  let component: AddPrizeStwComponent;
  let fixture: ComponentFixture<AddPrizeStwComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPrizeStwComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPrizeStwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
