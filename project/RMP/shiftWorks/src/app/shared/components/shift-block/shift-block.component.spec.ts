import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftBlockComponent } from './shift-block.component';

describe('ShiftBlockComponent', () => {
  let component: ShiftBlockComponent;
  let fixture: ComponentFixture<ShiftBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShiftBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
