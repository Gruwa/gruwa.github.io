import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithServicePropertyComponent } from './with-service-property.component';
import { HappyService } from '../services/happy.service';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('WithServicePropertyComponent', () => {
  let component: WithServicePropertyComponent;
  let fixture: ComponentFixture<WithServicePropertyComponent>;
  let mockHappyService: any;
  let happyService: any;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    // stub HappyService for test purposes
    mockHappyService = {
      hasHappy: false
    };

    TestBed.configureTestingModule({
      declarations: [
        WithServicePropertyComponent
      ],
      providers: [
        { provide: HappyService, useValue: mockHappyService }
      ]
    });

    fixture = TestBed.createComponent(WithServicePropertyComponent);
    component    = fixture.componentInstance;

    // HappyService from the root injector
    happyService = TestBed.get(HappyService);

    de = fixture.debugElement.query(By.css('div'));
    el = de.nativeElement;
  });

  it('stub object and injected HappyService should not be the same', () => {
    // Changing the stub object has no effect on the injected service
    mockHappyService.hasHappy = true;
    expect(happyService.hasHappy).toBe(false);
  });

  it('isHappy should be false', () => {
    fixture.detectChanges();
    const content = el.textContent;
    expect(content).toContain('Your happy status: false');
  });

  it('toggleHappy should toggle happy status true', () => {
    component.toggleHappy(); // toggle happy status
    fixture.detectChanges();
    expect(el.textContent).toContain('Your happy status: true');
  });
});
