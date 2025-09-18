import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchandiserListPmidaComponent } from './merchandiser-list-pmida.component';

describe('MerchandiserListPmidaComponent', () => {
  let component: MerchandiserListPmidaComponent;
  let fixture: ComponentFixture<MerchandiserListPmidaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MerchandiserListPmidaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchandiserListPmidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
