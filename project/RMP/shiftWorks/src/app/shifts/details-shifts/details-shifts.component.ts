import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ShiftsService} from '../Services/shifts.service';
import {LocalStorageService} from 'ngx-webstorage';
import {HttpService} from '../../shared/services/http.service';
import {FakeService} from '../../shared/services/fake.service';
import {Subject} from 'rxjs/Subject';
import {IShift} from '../../shared/interfaces/shift.interface';
import {IForm} from '../../shared/interfaces/form.interface';
import {IFooterRequest, IStatus} from '../../shared/interfaces/types.interface';
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

/**
 * FLOW for api link
 */

const FLOW = {
  upcoming: 'dataShiftsUpcoming$',
  'my requests': 'dataShiftsMyReq$',
  available: 'dataShiftsAvailable$'
};

/**
 * Shift status
 */

const STATUS = {
  scheduled: 'scheduled',
  'drop request': 'drop request',
  'pickup request': 'pickup request'
};

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
   * @type {object}
   * @memberof DetailsShiftsComponent
   */

  public shiftActive: object;

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

  public status: string;

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
    this.headerDescription = this.tab;

    if (this.dataService[`${FLOW[this.tab]}`] === undefined) {
      this.httpService.getShifts(this.tab);
      this.dataService[`${FLOW[this.tab]}`].takeUntil(this.ngUnsubscribe).subscribe();
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
      job: '',
      status: ''
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
    this.dataService[`${FLOW[this.tab]}`].subscribe(
      (value) => {
        this.shiftActive = {
          item: value['items'].find(item => item.shiftID === this.shiftActiveId),
          locationList: value.locationList,
          stationList: value.stationList,
          jobList: value.jobList
        };

        console.log(this.shiftActive);
        this.setDataForm();
      }
    );

    // this.shiftActive = this.dataService[`${FLOW[this.tab]}`].find(item => item.ID === this.shiftActiveId);
    // if (this.shiftActive !== undefined) {
    //     this.headerDescription = this.shiftActive.job; // TODO It's shiftTitle: from getDataShift() method - need replace
    // }

  }

  /**
   * Method for set data in form
   * @returns {void}
   * @memberof DetailsShiftsComponent
   */

  setDataForm(): void {
    // debugger
    if (this.tab === 'upcoming') {
      if (this.shiftActive['item'].isDropRequest && this.shiftActive['item'].isPickupRequest) {
        this.status = STATUS['pickup request'];
        this.footerActive = false;
      }
      if (!this.shiftActive['item'].isDropRequest && this.shiftActive['item'].isPickupRequest) {
        this.status = STATUS['pickup request'];
        this.footerActive = false;
      }
      if (!this.shiftActive['item'].isDropRequest && !this.shiftActive['item'].isPickupRequest) {
        this.status = STATUS['scheduled'];
        this.footerActive = true;
      }
      if (this.shiftActive['item'].isDropRequest && !this.shiftActive['item'].isPickupRequest) {
        this.status = STATUS['drop request'];
        this.footerActive = false;
      }

    }
    if (this.tab === 'available') {
      if (this.shiftActive['item'].isDropRequest && this.shiftActive['item'].isPickupRequest) {
        this.status = STATUS['pickup request'];
      }
      if (this.shiftActive['item'].isDropRequest && !this.shiftActive['item'].isPickupRequest) {
        this.status = STATUS['pickup request'];
      }
      if (!this.shiftActive['item'].isDropRequest && !this.shiftActive['item'].isPickupRequest) {
        this.status = STATUS['scheduled'];
      }

    }

    this.setFooterRequest();

    console.log(this.status);
    // let s: IStatus = STATUS[]
    this.shiftForm = {
      shiftTitle: this.localStorage.retrieve('tab'),
      date: this.shiftActive['item'].dateFrom,
      startTime: this.shiftActive['item'].dateFrom,
      endTime: this.shiftActive['item'].dateTo,
      location: this.shiftActive['item'].location,
      station: this.shiftActive['item'].station,
      job: this.shiftActive['item'].job,
      status: this.status,
    };
    console.log('form', this.shiftForm);
  }

  /**
   * Method for set description for FooterRequest
   * @returns {void}
   * @memberof DetailsShiftsComponent
   */

  setFooterRequest(): void {
    // debugger
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
    // debugger
    this.footerActive = !this.footerActive;

    if (this.tab === 'upcoming') {
      if (!this.footerActive) {
        this.shiftActive['item'].isDropRequest = true;
        this.setDataForm();
        console.log('request drop');
      } else {
        this.shiftActive['item'].isDropRequest = false;
        this.shiftActive['item'].isPickupRequest = false;
        this.setDataForm();
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
    this.setFooterRequest();
  }
}
