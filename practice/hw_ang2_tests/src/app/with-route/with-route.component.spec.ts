import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';

import { WithRouteComponent } from './with-route.component';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';

class MockRouter {
  navigate(url: string) { return url; }
}

describe('WithRouteComponent', () => {
  let component: WithRouteComponent;
  let fixture: ComponentFixture<WithRouteComponent>;

  beforeEach( async(() => {
    TestBed.configureTestingModule({
      declarations: [
        WithRouteComponent
      ],
      providers: [
        {provide: Router, useClass: MockRouter}
      ]
    })
      .compileComponents().then(() => {
      fixture = TestBed.createComponent(WithRouteComponent);
      component = fixture.componentInstance;
    });
  }));

  it('should tell ROUTER to navigate when clicked',
    inject([Router], (router: Router) => { // ...

      const spy = spyOn(router, 'navigate');

      fixture.debugElement.query(By.css('span')).nativeElement.click();

      // args passed to router.navigate
      const navArgs = spy.calls.first().args[0];

      // expecting to navigate to '/'
      expect(navArgs[0]).toBe('/');
    })
  );
});
