import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnsterButtonComponent } from './learnster-button.component';

describe('LearnsterButtonComponent', () => {
  let component: LearnsterButtonComponent;
  let fixture: ComponentFixture<LearnsterButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearnsterButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnsterButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
