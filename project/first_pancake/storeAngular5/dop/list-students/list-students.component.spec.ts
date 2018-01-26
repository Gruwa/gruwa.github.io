import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListStudentsComponent } from './list-students.component';

xdescribe('StudentsComponent', () => {
  let component: ListStudentsComponent;
  let fixture: ComponentFixture<ListStudentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListStudentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
