import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsShiftsComponent } from './details-shifts.component';

describe('DetailsShiftsComponent', () => {
  let component: DetailsShiftsComponent;
  let fixture: ComponentFixture<DetailsShiftsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsShiftsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsShiftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
