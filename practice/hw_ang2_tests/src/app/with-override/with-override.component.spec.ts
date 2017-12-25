import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithOverrideComponent } from './with-override.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { inject } from "@angular/core/testing";
import { WithInputOutputComponent } from '../with-input-output/with-input-output.component';

describe('WithOverrideComponent', () => {
  let fixture: ComponentFixture<WithOverrideComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithOverrideComponent, WithInputOutputComponent ]
    })
    .compileComponents();

    fixture = TestBed.overrideComponent(WithOverrideComponent, {
      set: {
        template: '<span>{{ jesus }}</span>'
      }})
      .createComponent(WithOverrideComponent);

    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('span'));
    el = de.nativeElement;
  }));

  it('should show Jesus Statham', () => {
    expect(el.textContent).toBe('Jesus Statham');
  });

  it('should change to PiwPiw', async(inject([], () => {
    fixture.componentInstance.makePiwPiw();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(el.textContent).toEqual('PiwPiw');
    });
  })));

});
