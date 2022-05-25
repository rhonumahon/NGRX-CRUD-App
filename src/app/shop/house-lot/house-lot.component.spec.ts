import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseLotComponent } from './house-lot.component';

describe('HouseLotComponent', () => {
  let component: HouseLotComponent;
  let fixture: ComponentFixture<HouseLotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseLotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseLotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
