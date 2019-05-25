//import {async, ComponentFixture, fakeAsync, inject, tick, TestBed} from '@angular/core/testing';

//import {ScheduleLoginComponent} from './schedule-login.component';
//import {FlowService} from '../../shared/services/flow.service';
//import {APP_BASE_HREF, Location} from '@angular/common';
//import {ReactiveFormsModule} from '@angular/forms';
//import {LocalStorageService} from 'ngx-webstorage';
//import {Router} from '@angular/router';
//import {RouterTestingModule} from '@angular/router/testing';
//import {Component, DebugElement, NO_ERRORS_SCHEMA} from '@angular/core';
//import {AppComponentsModule} from '../../shared/components/app-components.module';

//class FakeFlowService {
//}

//class FakeLocalStorageService {
//}

//@Component({
//  selector: 'app-shifts',
//  template: '<div>Group of shifts</div>'
//})
//class ShiftsMockComponent {
//}

//@Component({
//  selector: 'app-login',
//  template: '<div>Component of login</div>'
//})
//class LoginMockComponent {
//}

//describe('ScheduleLoginComponent', () => {
//  let component: ScheduleLoginComponent;
//  let fixture: ComponentFixture<ScheduleLoginComponent>;
//  let router: Router;
//  let location: Location;
//  let debugElement: DebugElement;
//  let htmlElement: HTMLElement;

//  beforeEach(async(() => {
//    let routerFake: any = {
//      navigate: function () {
//      },
//      routerState: {}
//    };

//    spyOn(routerFake, 'navigate');

//    TestBed.configureTestingModule({
//      imports: [
//        ReactiveFormsModule,
//        AppComponentsModule,
//        RouterTestingModule.withRoutes([
//          {path: 'login', component: LoginMockComponent},
//          {path: ':group/shifts', component: ShiftsMockComponent}
//        ])
//      ],
//      schemas: [NO_ERRORS_SCHEMA],
//      declarations: [
//        ScheduleLoginComponent,
//        ShiftsMockComponent,
//        LoginMockComponent
//      ],
//      providers: [
//        {
//          provide: APP_BASE_HREF,
//          useValue: '/app'
//        },
//        {
//          provide: FlowService,
//          useClass: FakeFlowService
//        },
//        {
//          provide: LocalStorageService,
//          useClass: FakeLocalStorageService
//        }
//      ]
//    })
//      .compileComponents();

//    fixture = TestBed.createComponent(ScheduleLoginComponent);
//    component = fixture.componentInstance;
//  }));


//  it('should create', () => {
//    expect(component).toBeTruthy();
//  });

//  it('should navigate to login route', inject([Router, Location], fakeAsync((router: Router, location: Location) => {
//      router.initialNavigation();
//      tick();
//      router.navigate(['login']);
//      tick();

//      expect(location.path()).toBe('/login');
//    })
//  ));

//  it('should navigate to group of shifts', inject([Router, Location], fakeAsync((router: Router, location: Location) => {
//      router.initialNavigation();
//      tick();
//      router.navigate([13, 'shifts']);
//      tick();

//      expect(location.path()).toBe('/13/shifts');
//    })
//  ));
//});
