import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {HeaderShiftsComponent} from './header-shifts.component';
import {MatTabsModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ShiftsService} from '../../../shifts/Services/shifts.service';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {AppRoutingModule} from '../../../app-routing.module';
import {PageNotFoundComponent} from '../not-found/not-found.component';
import {APP_BASE_HREF} from '@angular/common';
import {Ng2Webstorage} from 'ngx-webstorage';
import {DataService} from '../../services/data.service';

class FakeShiftsService {
}

class FakeDataService {
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
        PageNotFoundComponent
      ],
      providers: [
        {
          provide: ShiftsService,
          useClass: FakeShiftsService
        },
        {
          provide: DataService,
          useClass: FakeDataService
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

  it('should show Description', () => {
    debugElement = fixture.debugElement.query(By.css('span.header-shifts__description'));
    htmlElement = debugElement.nativeElement;

    expect(htmlElement.innerHTML).toEqual(component.headerDescription);
  });
});
