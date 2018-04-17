import {Component, OnDestroy, OnInit, Output} from '@angular/core';
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
import {ContentShiftsComponent} from '../content-shifts/content-shifts.component';
import 'rxjs/add/operator/takeUntil';

/**
 * Variable FOOTER_REQUESTS
 * @type {Array<IFooterRequest>}
 * @memberof DetailsShiftsComponent
 */

const FOOTER_REQUESTS: Array<IFooterRequest> = [
  'request drop',
  'cancel drop request',
  'request pickup',
  'cancel request pickup',
  'cancel request'
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
  'pickup request': 'pickup request',
  'cancel request': 'cancel request'
};

/**
 * Shift active
 */

const SHIFT_ACTIVE = {
  upcoming: 'isDropRequest',
  available: 'isPickupRequest'
};

/**
 * Shift request
 */

const SHIFT_REQUEST = {
  upcoming: 'pickup request',
  available: 'drop request'
};

/**
 * Details Shifts Component
 */

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

  /**
   * Variable of status
   * @type {string}
   * @memberof DetailsShiftsComponent
   */

  public status: string;

  /**
   * Creates an instance of DetailsShiftsComponent
   * @param {ActivatedRoute} route
   * @param {ShiftsService} shiftsService
   * @param {LocalStorageService} localStorage
   * @param {Router} router
   * @param {HttpService} httpService
   * @param {FakeService} fakeService
   * @param {DataService} dataService
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
    this.dataService.dataSave$.subscribe(this.saveShift.bind(this));
    this.tab = this.localStorage.retrieve('tab');
    this.shiftActiveId = this.route.snapshot.params['id'];
    this.headerDescription = this.tab;

    if (this.dataService[`${FLOW[this.tab]}`] === undefined) {
      console.log(this.tab);
      this.httpService.getShifts(this.tab);
      this.dataService[`${FLOW[this.tab]}`].takeUntil(this.ngUnsubscribe).subscribe();
    }

    console.log(this.shiftActiveId);

    if (this.shiftActiveId === 'new') {
      this.headerDescription = 'new request';
    }

    if (this.tab === 'my requests') {
      this.initForm();
    }
    this.getShifts();
    // this.setFooterRequest();
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

  /**
   * Method getDataShift
   * @returns {void}
   * @memberof DetailsShiftsComponent
   */

  getShifts(): void {
    this.dataService[`${FLOW[this.tab]}`].subscribe(
      (value) => {

        for (const i in FLOW) {
          if (this.dataService[`${FLOW[i]}`] === undefined) {
            this.httpService.getShifts(<ITabTypes>i);
          }
        }

        let item: any = {};

        if (this.route.snapshot.params['id'] !== 'new') {
          item = value['items'].find(result => result.shiftID === this.shiftActiveId);
        }

        this.shiftActive = {
          item: item,
          locationList: value.locationList,
          stationList: value.stationList,
          jobList: value.jobList
        };

        console.log(this.shiftActive);

        if (this.tab === 'upcoming' || this.tab === 'available') {
          if (this.shiftActive['item'].isDropRequest && this.shiftActive['item'].isPickupRequest) {
            this.status = STATUS[`${SHIFT_REQUEST[this.tab]}`];
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
        if (this.tab === 'my requests') {

          // TODO - WHat about status?
          this.status = 'What????';
        }

        if (this.route.snapshot.params['id'] !== 'new') {
          this.setDataForm();
        }

        this.setFooterRequest();
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
    this.shiftForm = {
      shiftTitle: this.localStorage.retrieve('tab'),
      date: this.shiftActive['item'].dateFrom,
      startTime: this.shiftActive['item'].dateFrom,
      endTime: this.shiftActive['item'].dateTo,
      location: this.shiftActive['item'].location,
      station: this.shiftActive['item'].station,
      job: this.shiftActive['item'].job,
      status: this.status,
      locationList: this.shiftActive['locationList'],
      stationList: this.shiftActive['stationList'],
      jobList: this.shiftActive['jobList']
    };
    console.log('form', this.shiftForm);
  }

  /**
   * Method for set description for FooterRequest
   * @returns {void}
   * @memberof DetailsShiftsComponent
   */

  setFooterRequest(): void {
    if (this.tab === 'upcoming') {
      this.footerActive ? this.footerDescription = FOOTER_REQUESTS[0] : this.footerDescription = FOOTER_REQUESTS[1];
    }
    if (this.tab === 'my requests') {
      this.footerDescription = FOOTER_REQUESTS[4];
    }
    if (this.tab === 'available') {
      this.footerActive ? this.footerDescription = FOOTER_REQUESTS[2] : this.footerDescription = FOOTER_REQUESTS[3];
    }
  }

  /**
   * Method for click on footer
   * @returns {void}
   * @memberof DetailsShiftsComponent
   */

  clickFooter(): void {
    this.footerActive = !this.footerActive;

    if (this.tab === 'upcoming' || this.tab === 'available') {
      if (!this.footerActive) {
        this.shiftActive['item'][`${SHIFT_ACTIVE[this.tab]}`] = true;
        if (this.tab === 'upcoming') {
          this.status = STATUS['drop request'];
        }
        if (this.tab === 'available') {
          this.status = STATUS['pickup request'];
        }
      } else {
        this.shiftActive['item'].isDropRequest = false;
        this.shiftActive['item'].isPickupRequest = false;
        this.status = STATUS['scheduled'];
        // this.setDataForm();
      }
    }
    if (this.tab === 'my requests') {
      if (this.route.snapshot.params['id'] === 'new') {
        this.router.navigate(['/' + this.route.snapshot.params['group'], 'shifts']);
      } else {
        this.deleteShift();
      }
    }

    this.setFooterRequest();
  }

  /**
   * Method for delete shift
   * @returns {void}
   * @memberof DetailsShiftsComponent
   */

  deleteShift(): void {
    console.log('DELETE');
    this.router.navigate(['/' + this.route.snapshot.params['group'], 'shifts']);
    // TODO - method for delete shift
  }

  /**
   * Method for save shift
   * @returns {void}
   * @memberof DetailsShiftsComponent
   */

  saveShift(e: boolean): void {
    console.log('SAVE');
    this.router.navigate(['/' + this.route.snapshot.params['group'], 'shifts']);
    // TODO - method for save shift
  }
}
