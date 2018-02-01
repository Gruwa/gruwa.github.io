import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUploaderComponent } from './project-uploader.component';

describe('FormUploaderComponent', () => {
  let component: FormUploaderComponent;
  let fixture: ComponentFixture<FormUploaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormUploaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
