import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WrapperPageComponent } from './wrapper-page.component';

describe('WrapperPageComponent', () => {
  let component: WrapperPageComponent;
  let fixture: ComponentFixture<WrapperPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WrapperPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WrapperPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
