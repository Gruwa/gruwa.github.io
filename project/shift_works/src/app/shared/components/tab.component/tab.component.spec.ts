import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TabComponent} from './tab.component';
import {CommonModule} from '@angular/common';
import {MatDividerModule, MatListModule, MatTabsModule} from '@angular/material';
import {ShiftsService} from '../../services/shifts.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';

class FakeShiftsService { }

describe('TabComponent', () => {
    let component: TabComponent;
    let fixture: ComponentFixture<TabComponent>;
    let debugElement: DebugElement;
    let htmlElement: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MatTabsModule,
                BrowserAnimationsModule,
                // MatDividerModule,
                // MatListModule,
            ],
            declarations: [
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
        fixture = TestBed.createComponent(TabComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('Should have a label', async(() => {
        fixture = TestBed.createComponent(TabComponent);
        fixture.detectChanges();
        debugElement = fixture.debugElement.query(By.css('.mat-tab-label-content'));
        htmlElement = debugElement.nativeElement;

        expect(htmlElement.textContent).toContain('upcoming' || 'my requests' || 'available');
    }));
});
