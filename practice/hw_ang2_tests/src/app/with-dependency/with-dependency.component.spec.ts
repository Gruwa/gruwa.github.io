import {
  async, ComponentFixture,
  inject,
  TestBed,
} from '@angular/core/testing';
import { WithDependencyComponent } from './with-dependency.component';
import { HappyService } from '../services/happy.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { fakeAsync } from "@angular/core/testing";
import { tick } from "@angular/core/testing";
import { HttpModule } from '@angular/http';

class MockHappyService {
  public happy: string = 'Happy';

  getHappy() {
    return Observable.of(this.happy);
  }
}

describe('WithDependencyComponent the first way', () => {
  let fixture: ComponentFixture<WithDependencyComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [
        WithDependencyComponent
      ],
      providers: [
        {provide: HappyService, useClass: MockHappyService}
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(WithDependencyComponent);
    fixture.detectChanges();

    de = fixture.debugElement.query(By.css('div'));
    el = de.nativeElement;
  });

  it('should get happy at call getSomeHappy', async(inject([], () => {
    expect(el.innerText).toEqual('No happiness yet');
    fixture.componentInstance.getSomeHappy();
    fixture.whenStable()
      .then(() => {
        fixture.detectChanges();
        return fixture.whenStable();
      })
      .then(() => {
        expect(el.innerText).toEqual('Happy');
      });
  })));
});


describe('WithDependencyComponent the second way', ()=> {
  let component: WithDependencyComponent;
  let fixture: ComponentFixture<WithDependencyComponent>;
  let happyService: any;
  let spy: any;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      declarations: [ WithDependencyComponent ],
      providers:    [ HappyService ],
    });

    fixture = TestBed.createComponent(WithDependencyComponent);
    component = fixture.componentInstance;

    // TwainService actually injected into the component
    happyService = fixture.debugElement.injector.get(HappyService);

    // Setup spy on the `getHappy` method
    spy = spyOn(happyService, 'getHappy')
      .and.returnValue(Observable.of('Happy'));

    // Get the Twain quote element by CSS selector (e.g., by class name)
    de = fixture.debugElement.query(By.css('div'));
    el = de.nativeElement;
  });

  it('should show No happiness yet before call getSomeHappy', () => {
    fixture.detectChanges();
    expect(el.textContent).toContain('No happiness yet');
    expect(spy.calls.any()).toBe(false, 'getSomeHappy called yet');
  });

  it('should still show No happiness yet after call getSomeHappy, but no fixture.detectChanges', () => {
    fixture.detectChanges();
    component.getSomeHappy();
    expect(el.textContent).toContain('No happiness yet');
    expect(spy.calls.any()).toBe(true, 'getSomeHappy called');
  });

  it('should show Happy after getSomeHappy promise (async)', async(() => {
    fixture.detectChanges();
    component.getSomeHappy();
    fixture.whenStable().then(() => { // wait for async getSomeHappy
      fixture.detectChanges();        // update view with happy
      expect(el.textContent).toContain('Happy');
    });
  }));

  it('should show Happy after getSomeHappy promise (fakeAsync)', fakeAsync(() => {
    fixture.detectChanges();
    component.getSomeHappy();
    tick();                  // wait for async getSomeHappy
    fixture.detectChanges(); // update view with happy
    expect(el.textContent).toContain('Happy');
  }));

  it('should show Happy after getSomeHappy promise (done)', (done: any) => {
    fixture.detectChanges();
    component.getSomeHappy();
    // get the spy promise and wait for it to resolve
    spy.calls.mostRecent().returnValue.subscribe(() => {
      fixture.detectChanges(); // update view with quote
      expect(el.textContent).toBe('Happy');
      done();
    });
  });
});
