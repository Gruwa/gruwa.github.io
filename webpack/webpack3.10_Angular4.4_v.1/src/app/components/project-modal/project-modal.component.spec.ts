import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnsterModalComponent } from './learnster-modal.component';

describe('LearnsterModalComponent', () => {
  let component: LearnsterModalComponent;
  let fixture: ComponentFixture<LearnsterModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearnsterModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnsterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
