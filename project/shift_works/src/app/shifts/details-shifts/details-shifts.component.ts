import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ShiftsService} from '../../shared/services/shifts.service';
import {IForm, IShift} from '../../shared/interfaces/types.interface';
import {LocalStorageService} from 'ngx-webstorage';
import * as Types from '../../shared/interfaces/types.interface';
import {HttpService} from '../../shared/services/http.service';
import {FakeService} from '../../shared/services/fake.service';

const FOOTER_REQUESTS: Array<Types.IFooterRequest> = [
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
export class DetailsShiftsComponent implements OnInit {

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
     * @type {string}
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
     * @type {Types.ITabTypes}
     * @memberof DetailsShiftsComponent
     */

    public tab: Types.ITabTypes = 'upcoming';

    /**
     * Variable of footerDescription
     * @type {Types.IFooterRequest}
     * @memberof DetailsShiftsComponent
     */

    public footerDescription: Types.IFooterRequest;

    /**
     * Variable of footerActive
     * @type {boolean}
     * @memberof DetailsShiftsComponent
     */

    public footerActive: boolean = true;

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

        if (this.shiftActive === undefined) {
            this.initForm();
            this.getShifts();
        } else {
            this.initForm();
            this.headerDescription = this.shiftActive.Job; // TODO It's shiftTitle: from getDataShift() method - need replace
        }

        this.setFooterRequest();
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
            shiftTitleDescription: '',
            dateDescription: '',
            startTimeDescription: '',
            endTimeDescription: '',
            locationDescription: '',
            stationDescription: '',
            jobTitleDescription: '',
            statusDescription: '',
        };
    }

    /**
     * Method getDataShift
     * @returns {void}
     * @memberof DetailsShiftsComponent
     */

    getShifts(): void {
        this.httpService.getShifts(this.localStorage.retrieve('tab')).subscribe(
            (value: any) => {
                console.log(value);
                this.shiftActive = value.find(item => item.ID === this.shiftActiveId);
                if(this.shiftActive !== undefined) {
                    this.headerDescription = this.shiftActive.Job; // TODO It's shiftTitle: from getDataShift() method - need replace
                }
                this.setDataForm();
            },
            (error) => {
                console.log('sdfdfsdfsdfsdfsd');
                this.shiftActive = this.fakeService.shiftsDataFake.find(item => item.ID === this.shiftActiveId);
                if(this.shiftActive !== undefined) {
                    this.headerDescription = this.shiftActive.Job; // TODO It's shiftTitle: from getDataShift() method - need replace
                }
                this.setDataForm();
            }
        );
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
            location: 'what???',
            station: this.shiftActive.Station,
            jobTitle: this.shiftActive.Job,
            status: 'what???',
            shiftTitleDescription: 'shift title',
            dateDescription: 'date',
            startTimeDescription: 'start time',
            endTimeDescription: 'end time',
            locationDescription: 'location',
            stationDescription: 'station',
            jobTitleDescription: 'job title',
            statusDescription: 'status',
        };
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
