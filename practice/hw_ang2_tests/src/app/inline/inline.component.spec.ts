import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';

import { InlineComponent } from './inline.component';
import { ComponentFixtureAutoDetect } from "@angular/core/testing";

// Manual detectChanges
describe('InlineComponent (manual detectChanges)', () => {

  let comp: InlineComponent;
  let fixture: ComponentFixture<InlineComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ InlineComponent ], // declare the test component
    });

    fixture = TestBed.createComponent(InlineComponent);

    comp = fixture.componentInstance; // BannerComponent test instance

    // query for the title <h1> by CSS element selector
    de = fixture.debugElement.query(By.css('h1'));
    el = de.nativeElement;
  });

  it('should display original jesus text', () => {
    fixture.detectChanges(); // detect changes in component
    expect(el.textContent).toContain(comp.jesus);
  });

  it('should display a different jesus text', () => {
    comp.jesus = 'Jesus F*cking Statham';
    fixture.detectChanges();
    expect(el.textContent).toContain('Jesus F*cking Statham');
  });

  it('no jesus in the DOM until manually call `detectChanges`', () => {
    expect(el.textContent).toEqual('');
  });
});



// Automatic detectChanges
describe('InlineComponent (automatic detectChanges)', () => {

  let comp: InlineComponent;
  let fixture: ComponentFixture<InlineComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ InlineComponent ],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true }
      ]
    });
    fixture = TestBed.createComponent(InlineComponent);

    comp = fixture.componentInstance; // BannerComponent test instance

    // query for the title <h1> by CSS element selector
    de = fixture.debugElement.query(By.css('h1'));
    el = de.nativeElement;
  });

  it('should display original jesus name', () => {
    // Hooray! No `fixture.detectChanges()` needed
    expect(el.textContent).toContain(comp.jesus);
  });

  it('should still see original jesus name after comp.jesus change', () => {
    const oldTitle = comp.jesus;
    comp.jesus = 'Test Title';
    // Displayed title is old because Angular didn't hear the change :(
    expect(el.textContent).toContain(oldTitle);
  });

  it('should display updated jesus name after detectChanges', () => {
    comp.jesus = 'Test Title';
    fixture.detectChanges(); // detect changes explicitly
    expect(el.textContent).toContain(comp.jesus);
  });
});
