import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ShiftsService} from '../../shared/services/shifts.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import * as Types from '../../shared/interfaces/types.interface';
import {HttpService} from '../../shared/services/http.service';
import {FakeService} from '../../shared/services/fake.service';
import {LocalStorageService} from 'ngx-webstorage';
import {Router} from '@angular/router';
import 'rxjs/add/observable/merge';
import {IShift} from '../../shared/interfaces/types.interface';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';


@Component({
    selector: 'app-content-shifts',
    templateUrl: './content-shifts.component.html',
    styleUrls: ['./content-shifts.component.scss']
})
export class ContentShiftsComponent implements OnInit, OnDestroy {

    /**
     * Variable of tab
     * @type {Types.ITabTypes}
     * @memberof ContentShiftsComponent
     */

    public tab: Types.ITabTypes = 'upcoming';

    /**
     * Variable of sortShifts
     * @type {Array<Types.IShiftsSorted>}
     * @memberof ContentShiftsComponent
     */

    public sortShifts: Array<Types.IShiftsSorted>;

    private ngUnsubscribe: Subject<void> = new Subject<void>();

    /**
     * Creates an instance of ContentShiftsComponent
     * @param {HttpClient} http
     * @param {ShiftsService} shiftsService
     * @param {HttpService} httpService
     * @param {FakeService} fakeService
     * @param {LocalStorageService} localStorage
     * @memberof ContentShiftsComponent
     */

    constructor(public http: HttpClient,
                public shiftsService: ShiftsService,
                public httpService: HttpService,
                public fakeService: FakeService,
                public router: Router,
                public localStorage: LocalStorageService) {
    }

    /**
     * Method ngOnInit
     * @returns {void}
     * @memberof ContentShiftsComponent
     */

    ngOnInit(): void {
        this.shiftsService.dataTab$.takeUntil(this.ngUnsubscribe).subscribe(this.dataFlowObserver.bind(this));
        this.tab = this.localStorage.retrieve('tab');

        if (this.httpService.dataOfShifts$ === undefined) {
            this.httpService.getShifts(this.tab);
        }

        this.httpService.dataOfShifts$.takeUntil(this.ngUnsubscribe).subscribe();
        this.getShifts();
    }

    /**
     * Method ngOnDestroy
     * @returns {void}
     * @memberof ContentShiftsComponent
     */

    ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    /**
     * Method of geting event from tab flow
     * @returns {void}
     * @memberof ContentShiftsComponent
     */

    dataFlowObserver(eventData: Types.ITabTypes): void {
        console.log('dataTab$', eventData);
        this.tab = eventData;
        this.localStorage.store('tab', this.tab);
        // this.getShifts();
    }

    /**
     * Method for get Shifts
     * @returns {void}
     * @memberof ContentShiftsComponent
     */

    getShifts() {
        this.sortShifts = this.shiftsService.sortShifts(this.httpService.dataOfShifts$['array']);

        // this.httpService.getShifts(this.tab).subscribe(
        //     (value: any) => {
        //         this.sortShifts = this.shiftsService.sortShifts(value);
        //     },
        //     (error) => {
        //         this.sortShifts = this.shiftsService.sortShifts(this.fakeService.shiftsDataFake);
        //         console.log('getShifts', this.sortShifts);
        //     }
        // );
    }

    /**
     * Method for add new request
     * @returns {void}
     * @memberof ContentShiftsComponent
     */

    addNewMyRequest() {
        console.log('ALL SAVE');
        this.router.navigate(['/shifts', 'new']);
    }
}
