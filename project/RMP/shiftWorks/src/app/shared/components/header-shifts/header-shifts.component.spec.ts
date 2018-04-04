import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {HeaderShiftsComponent} from './header-shifts.component';
import {TabComponent} from '../tab.component/tab.component';
import {MatTabsModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ShiftsService} from '../../../shifts/Services/shifts.service';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {AppRoutingModule} from '../../../app-routing.module';
import {PageNotFoundComponent} from '../../../not-found.component';
import {APP_BASE_HREF} from '@angular/common';
import {Ng2Webstorage} from 'ngx-webstorage';

class FakeShiftsService {
}

describe('HeaderShiftsComponent', () => {
  let component: HeaderShiftsComponent;
  let fixture: ComponentFixture<HeaderShiftsComponent>;
  let debugElement: DebugElement;
  let htmlElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatTabsModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        Ng2Webstorage
      ],
      declarations: [
        HeaderShiftsComponent,
        TabComponent,
        PageNotFoundComponent
      ],
      providers: [
        {
          provide: ShiftsService,
          useClass: FakeShiftsService
        },
        {
          provide: APP_BASE_HREF,
          useValue: '/api'
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderShiftsComponent);
    component = fixture.componentInstance;
    component.headerDescription = 'shifts';
    // console.log(component);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should have a label', async(() => {
    debugElement = fixture.debugElement.query(By.css('span.header-shifts__description'));
    htmlElement = debugElement.nativeElement;

    expect(htmlElement.textContent).toContain('shifts');
  }));

  // it('should show Description', () => {
  //   console.log(htmlElement.querySelector('.header-shifts__description'));
  //   const description = htmlElement.querySelector('span.header-shifts__description');
  //
  //   expect(description).toEqual(component.headerDescription);
  // });

  // it ('should invoke function', fakeAsync( () => {
  //   debugElement = fixture.debugElement.query(By.css('i.ttt'));
  //   htmlElement = debugElement.nativeElement;
  //   console.log(htmlElement);
  //   let spy = spyOn(component, 'closeOurPage');
  //   htmlElement.dispatchEvent(new Event('click'));
  //
  //   fixture.detectChanges();
  //   tick();
  //
  //   expect(spy).toHaveBeenCalled();
  // }));
});
