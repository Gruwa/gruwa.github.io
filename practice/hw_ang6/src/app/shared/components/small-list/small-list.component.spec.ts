import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallListComponent } from './small-list.component';

describe('SmallListComponent', () => {
  let component: SmallListComponent;
  let fixture: ComponentFixture<SmallListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmallListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmallListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
