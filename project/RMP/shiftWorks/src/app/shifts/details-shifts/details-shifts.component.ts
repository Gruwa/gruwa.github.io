import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ShiftsService} from '../Services/shifts.service';
import {LocalStorageService} from 'ngx-webstorage';
import {HttpService} from '../../shared/services/http.service';
import {FakeService} from '../../shared/services/fake.service';
import {Subject} from 'rxjs/Subject';
import {IShift} from '../../shared/interfaces/shift.interface';
import {IForm} from '../../shared/interfaces/form.interface';
import {IFooterRequest} from '../../shared/interfaces/types.interface';
import {ITabTypes} from '../../shared/interfaces/types.interface';
import {DataService} from '../../shared/services/data.service';

/**
 * Variable FOOTER_REQUESTS
 * @type {Array<IFooterRequest>}
 * @memberof DetailsShiftsComponent
 */

const FOOTER_REQUESTS: Array<IFooterRequest> = [
    'request drop',
    'cancel drop request',
    'cancel request',
    'request pickup',
    'cancel request pickup'
];

@Component({
    selector: 'app-details-shifts',
    templateUrl: './details-shifts.component.html',
    styleUrls: ['./details-shifts.component.scss']
})
export class DetailsShiftsComponent implements OnInit, OnDestroy {

    /**
     * Variable headerDescription
     * @type {string}
     * @memberof DetailsShiftsComponent
     */

    public headerDescription: string = 'New request';

    /**
     * Variable shiftActiveId
     * @type {string}
     * @memberof DetailsShiftsComponent
     */

    public shiftActiveId: string;

    /**
     * Variable shiftActive
     * @type {IShift}
     * @memberof DetailsShiftsComponent
     */

    public shiftActive: IShift;

    /**
     * Variable shiftForm
     * @type {IForm}
     * @memberof DetailsShiftsComponent
     */

    public shiftForm: IForm;

    /**
     * Variable of tab
     * @type {ITabTypes}
     * @memberof DetailsShiftsComponent
     */

    public tab: ITabTypes = 'upcoming';

    /**
     * Variable of footerDescription
     * @type {IFooterRequest}
     * @memberof DetailsShiftsComponent
     */

    public footerDescription: IFooterRequest;

    /**
     * Variable of footerActive
     * @type {boolean}
     * @memberof DetailsShiftsComponent
     */

    public footerActive: boolean = true;

    /**
     * Variable of ngUnsubscribe
     * @type {Subject<void>}
     * @memberof DetailsShiftsComponent
     */

    private ngUnsubscribe: Subject<void> = new Subject<void>();

    /**
     * Creates an instance of DetailsShiftsComponent
     * @param {ActivatedRoute} route
     * @param {ShiftsService} shiftsService
     * @param {LocalStorageService} localStorage
     * @param {Router} router
     * @param {HttpService} httpService
     * @param {FakeService} fakeService
     * @memberof DetailsShiftsComponent
     */

    constructor(public route: ActivatedRoute,
                public shiftsService: ShiftsService,
                public localStorage: LocalStorageService,
                public httpService: HttpService,
                public fakeService: FakeService,
                public dataService: DataService,
                public router: Router) {
    }

    /**
     * Method ngOnInit
     * @returns {void}
     * @memberof DetailsShiftsComponent
     */

    ngOnInit(): void {
        this.tab = this.localStorage.retrieve('tab');
        this.shiftActiveId = this.route.snapshot.params['id'];

        if (this.dataService.dataShifts$ === undefined) {
            this.httpService.getShifts();
            this.dataService.dataShifts$.takeUntil(this.ngUnsubscribe).subscribe();
        }

        console.log(this.shiftActiveId);

        if (this.shiftActiveId === 'new') {
            console.log('new', this.shiftActiveId);
            this.initForm();
            this.initNewForm();
            this.headerDescription = 'New request';
        } else {
            console.log('this.shiftActive else');
            this.initForm();
            this.getShifts();
        }

        this.setFooterRequest();
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
     * Method for init form
     * @returns {void}
     * @memberof DetailsShiftsComponent
     */

    initForm(): void {
        this.shiftForm = {
            shiftTitle: '',
            date: '',
            startTime: '',
            endTime: '',
            location: '',
            station: '',
            jobTitle: '',
            status: '',
            shiftTitleDescription: 'shift title',
            dateDescription: 'date',
            startTimeDescription: 'start time',
            endTimeDescription: 'end time',
            locationDescription: 'location',
            stationDescription: 'station',
            jobTitleDescription: 'job title',
            statusDescription: 'status'
        };
    }

    initNewForm() {

    }

    /**
     * Method getDataShift
     * @returns {void}
     * @memberof DetailsShiftsComponent
     */

    getShifts(): void {
        this.shiftActive = this.dataService.dataShifts$['array'].find(item => item.ID === this.shiftActiveId);
console.log(this.shiftActive)
        if (this.shiftActive !== undefined) {
            this.headerDescription = this.shiftActive.job; // TODO It's shiftTitle: from getDataShift() method - need replace
        }

        this.setDataForm();
    }

    /**
     * Method for set data in form
     * @returns {void}
     * @memberof DetailsShiftsComponent
     */

    setDataForm(): void {
        this.shiftForm = {
            shiftTitle: this.localStorage.retrieve('tab'),
            date: this.shiftActive.dateFrom,
            startTime: this.shiftActive.dateFrom,
            endTime: this.shiftActive.dateTo,
            location: this.shiftActive.location,
            station: this.shiftActive.station,
            jobTitle: this.shiftActive.job,
            locationGroup: this.shiftActive.locationGroup,
            stationGroup: this.shiftActive.stationGroup,
            jobTitleGroup: this.shiftActive.jobTitleGroup, // TODO - don't show
            status: 'what???',
            shiftTitleDescription: 'shift title',
            dateDescription: 'date',
            startTimeDescription: 'start time',
            endTimeDescription: 'end time',
            locationDescription: 'location',
            stationDescription: 'station',
            jobTitleDescription: 'job title',
            statusDescription: 'status'
        };
        console.log('form', this.shiftForm)
    }

    /**
     * Method for set description for FooterRequest
     * @returns {void}
     * @memberof DetailsShiftsComponent
     */

    setFooterRequest(): void {
        if (this.tab === 'upcoming') {
            this.footerActive ? this.footerDescription = 'request drop' : this.footerDescription = 'cancel drop request';
        }
        if (this.tab === 'my requests') {
            this.footerDescription = 'cancel request';
        }
        if (this.tab === 'available') {
            this.footerActive ? this.footerDescription = 'request pickup' : this.footerDescription = 'cancel request pickup';
        }
    }

    /**
     * Method for click on footer
     * @returns {void}
     * @memberof DetailsShiftsComponent
     */

    clickFooter(): void {
        this.footerActive = !this.footerActive;
        this.setFooterRequest();

        if (this.tab === 'upcoming') {
            if (!this.footerActive) {
                console.log('request drop');
            } else {
                console.log('cancel drop request');
            }
        }
        if (this.tab === 'my requests') {
            console.log('CANCEEEL');
        }
        if (this.tab === 'available') {
            if (!this.footerActive) {
                console.log('request pickup');
            } else {
                console.log('cancel request pickup');
            }
        }
    }
}
