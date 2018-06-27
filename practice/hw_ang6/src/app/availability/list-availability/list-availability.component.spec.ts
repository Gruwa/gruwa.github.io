import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAvailabilityComponent } from './list-availability.component';

describe('ListAvailabilityComponent', () => {
  let component: ListAvailabilityComponent;
  let fixture: ComponentFixture<ListAvailabilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAvailabilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
