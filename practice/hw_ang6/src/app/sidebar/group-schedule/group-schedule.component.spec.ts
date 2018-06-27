import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupScheduleComponent } from './group-schedule.component';

describe('GroupScheduleComponent', () => {
  let component: GroupScheduleComponent;
  let fixture: ComponentFixture<GroupScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
