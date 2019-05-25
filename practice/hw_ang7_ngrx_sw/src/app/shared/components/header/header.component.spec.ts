import {
  async,
  ComponentFixture, inject,
  TestBed
} from '@angular/core/testing';
import {HeaderComponent} from './header.component';
import {MatTabsModule, MatToolbarModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ShiftsService} from '../../../shifts/services/shifts.service';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {AppRoutingModule} from '../../../app-routing.module';
import {PageNotFoundComponent} from '../not-found/not-found.component';
import {APP_BASE_HREF, Location} from '@angular/common';
import {FlowService} from '../../services/flow.service';
import {PipeModule} from '../../pipes/pipe.module';
import {CapitalizeFirstPipe} from '../../pipes/capitalize-first/capitalize-first.pipe';
import {RouterTestingModule} from '@angular/router/testing';
import {NgxWebstorageModule} from 'ngx-webstorage';
import {MaterialsModule} from '../materials/materials.module';
import {ToastrModule} from 'ngx-toastr';
import {Router} from '@angular/router';

class FakeShiftsService {
}

class FakeFlowService {
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let debugElement: DebugElement;
  let htmlElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        AppRoutingModule,
        NgxWebstorageModule.forRoot(),
        PipeModule.forRoot(),
        MaterialsModule,
        ToastrModule.forRoot({
          timeOut: 1500,
        })
      ],
      declarations: [
        HeaderComponent,
        PageNotFoundComponent
      ],
      providers: [
        {
          provide: ShiftsService,
          useClass: FakeShiftsService
        },
        {
          provide: FlowService,
          useClass: FakeFlowService
        },
        {
          provide: APP_BASE_HREF,
          useValue: '/api'
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    // component.headerDescription = 'shifts';

    fixture.detectChanges();
  }));

  it('should create HeaderComponent', async(() => {
    expect(component).toBeTruthy();
  }));

  it('should call to a function clickEvent when clicked',
    async(() => {
      const spy = spyOn(component, 'clickEvent');
      fixture.debugElement.query(By.css('.header__header i:first-child')).nativeElement.click();

      expect(spy).toHaveBeenCalled();
    })
  );

  //
  // it('Should have a label', async(() => {
  //   debugElement = fixture.debugElement.query(By.css('span.header-shifts__description'));
  //   htmlElement = debugElement.nativeElement;
  //
  //   expect(htmlElement.textContent).toContain('shifts');
  // }));
  //
  // it('should show Description', () => {
  //   debugElement = fixture.debugElement.query(By.css('span.header-shifts__description'));
  //   htmlElement = debugElement.nativeElement;
  //
  //   expect(htmlElement.innerHTML).toEqual(component.headerDescription);
  // });
});
