import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistanceDoneComponent } from './distance-done.component';

describe('DistanceDoneComponent', () => {
  let component: DistanceDoneComponent;
  let fixture: ComponentFixture<DistanceDoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistanceDoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistanceDoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
