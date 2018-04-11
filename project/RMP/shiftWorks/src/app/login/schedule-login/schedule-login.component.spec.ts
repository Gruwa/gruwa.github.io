import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleLoginComponent } from './schedule-login.component';

describe('ScheduleLoginComponent', () => {
  let component: ScheduleLoginComponent;
  let fixture: ComponentFixture<ScheduleLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
