import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectUploaderComponent } from './project-uploader.component';

describe('FormUploaderComponent', () => {
  let component: ProjectUploaderComponent;
  let fixture: ComponentFixture<ProjectUploaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectUploaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
