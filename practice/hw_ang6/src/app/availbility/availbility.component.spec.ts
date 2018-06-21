import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailbilityComponent } from './availbility.component';

describe('AvailbilityComponent', () => {
  let component: AvailbilityComponent;
  let fixture: ComponentFixture<AvailbilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvailbilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailbilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
