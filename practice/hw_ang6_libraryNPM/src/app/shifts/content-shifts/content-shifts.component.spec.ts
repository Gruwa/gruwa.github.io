import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentShiftsComponent } from './content-shifts.component';

describe('ContentShiftsComponent', () => {
  let component: ContentShiftsComponent;
  let fixture: ComponentFixture<ContentShiftsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentShiftsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentShiftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
