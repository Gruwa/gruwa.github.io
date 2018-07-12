import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormContactInfoComponent } from './form-contact-info.component';

describe('FormContactInfoComponent', () => {
  let component: FormContactInfoComponent;
  let fixture: ComponentFixture<FormContactInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormContactInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormContactInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
