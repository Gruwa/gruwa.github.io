import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithInputOutputComponent } from './with-input-output.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { WithOverrideComponent } from '../with-override/with-override.component';

describe('WithInputOutputComponent', () => {
  let component: WithInputOutputComponent;
  let fixture: ComponentFixture<WithInputOutputComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let jesus: string = 'Jesus Statham';

  // async beforeEach
  beforeEach( async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithInputOutputComponent ],
    })
      .compileComponents(); // compile template and css
  }));

  // synchronous beforeEach
  beforeEach(() => {
    fixture = TestBed.createComponent(WithInputOutputComponent);
    component = fixture.componentInstance;
    component.jesus = jesus;

    de = fixture.debugElement.query(By.css('h1')); // find element
    el = de.nativeElement;
    fixture.detectChanges(); // trigger initial data binding
  });

  it('should display Jesus Statham', () => {
    fixture.detectChanges();
    expect(el.textContent).toContain(jesus);
  });

  it('should raise click event when clicked', () => {
    let currentJesus = jesus;
    component.onClick.subscribe((e: string) => currentJesus = e);
    fixture.debugElement.query(By.css('button')).nativeElement.click('click', 'Jesus F*cking Statham');
    fixture.detectChanges();
    expect(currentJesus).toBe('Jesus F*cking Statham');
  });

});


describe('WithInputOutputComponent test wrapping component for input-output', () => {
  let fixture: ComponentFixture<WithOverrideComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let jesus: string = 'Jesus Statham';

  beforeEach( async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithInputOutputComponent, WithOverrideComponent ], // declare both
    }).compileComponents();
  }));

  beforeEach(() => {
    // create TestHostComponent instead of DashboardHeroComponent
    fixture  = TestBed.createComponent(WithOverrideComponent);

    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('h1'));
    el = de.nativeElement;
  });

  it('should display Jesus Statham', () => {
    fixture.detectChanges();
    expect(el.textContent).toContain(jesus);
  });

  it('should raise click event when clicked', () => {
    fixture.debugElement.query(By.css('button')).nativeElement.click();
    // selected hero should be the same data bound hero
    expect(fixture.componentInstance.jesus).toBe('Jesus F*cking Statham');
  });
});
