import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NormalUsageComponent } from './normal-usage.component';
import { DebugElement } from '@angular/core';

describe('NormalUsageComponent', () => {
  let component: NormalUsageComponent;
  let fixture: ComponentFixture<NormalUsageComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NormalUsageComponent ], // declare the test component
    })
      .compileComponents();  // compile template and css
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NormalUsageComponent);

    component = fixture.componentInstance; // BannerComponent test instance

    // query for the title <h1> by CSS element selector
    de = fixture.debugElement.query(By.css('h1'));
    el = de.nativeElement;
  });

  it('should display original jesus name', () => {
    fixture.detectChanges();
    expect(el.textContent).toContain(component.jesus);
  });

  it('should display a different jesus name', () => {
    component.jesus = 'Jesus F*cking Statham';
    fixture.detectChanges();
    expect(el.textContent).toContain('Jesus F*cking Statham');
  });

  it('no jesus in the DOM until manually call `detectChanges`', () => {
    expect(el.textContent).toEqual('');
  });
});
