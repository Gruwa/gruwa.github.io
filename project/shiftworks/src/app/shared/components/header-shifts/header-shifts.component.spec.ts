import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HeaderShiftsComponent} from './header-shifts.component';
import {TabComponent} from '../tab.component/tab.component';
import {MatTabsModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ShiftsService} from '../../services/shifts.service';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

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
                BrowserAnimationsModule
            ],
            declarations: [
                HeaderShiftsComponent,
                TabComponent
            ],
            providers: [
                {
                    provide: ShiftsService,
                    useClass: FakeShiftsService
                },
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
        fixture = TestBed.createComponent(HeaderShiftsComponent);
        debugElement = fixture.debugElement.query(By.css('span.header-shifts__description'));
        htmlElement = debugElement.nativeElement;

        fixture.whenStable().then(() => {
            fixture.detectChanges();
            expect(htmlElement.textContent).toContain('shifts');
        });
    }));
});
