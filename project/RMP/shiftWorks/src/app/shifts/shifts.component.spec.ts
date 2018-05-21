import {async, ComponentFixture, getTestBed, TestBed} from '@angular/core/testing';

import {ShiftsComponent} from './shifts.component';
import {MatDividerModule, MatListModule, MatTabsModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DebugElement, Injector} from '@angular/core';
import {HeaderShiftsComponent} from '../shared/components/header-shifts/header-shifts.component';
import {ContentShiftsComponent} from './content-shifts/content-shifts.component';
import {ShiftBlockComponent} from '../shared/components/shift-block/shift-block.component';
import {HttpClientModule} from '@angular/common/http';
import {ShiftsService} from './services/shifts.service';
import {HttpService} from '../shared/services/http.service';
import {FakeService} from '../shared/services/fake.service';

class FakeShiftsService {
}

class FakeHttpService {
}

class FakeFakeService {
}

describe('ShiftsComponent', () => {
    let component: ShiftsComponent;
    let fixture: ComponentFixture<ShiftsComponent>;
    let debugElement: DebugElement;
    let htmlElement: HTMLElement;
    let injector:  Injector;
    let httpService = {};
    let shiftsService = {};
    let fakeService = {};

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MatTabsModule,
                BrowserAnimationsModule,
                MatDividerModule,
                MatListModule,
                HttpClientModule
            ],
            declarations: [
                ShiftsComponent,
                HeaderShiftsComponent,
                ContentShiftsComponent,
                ShiftBlockComponent
            ],
            providers: [
                {
                    provide: ShiftsService,
                    useClass: FakeShiftsService
                },
                {
                    provide: HttpService,
                    useClass: FakeHttpService
                },
                {
                    provide: FakeService,
                    useClass: FakeFakeService
                },
            ]

        })
            .compileComponents();

        injector = getTestBed();
        httpService = injector.get(HttpService);
        shiftsService = injector.get(ShiftsService);
        fakeService = injector.get(FakeService);

    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ShiftsComponent);
        component = fixture.componentInstance;
        component.headerDescription = 'shifts';

        fixture.detectChanges();
    });

    // it('should create', () => {
    //     expect(component).toBeTruthy();
    // });
});
