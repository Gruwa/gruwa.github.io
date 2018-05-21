import {Component, OnDestroy, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ShiftsService} from '../Services/shifts.service';
import {LocalStorageService} from 'ngx-webstorage';
import {HttpService} from '../../shared/services/http.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {IFooterRequest} from '../../shared/interfaces/types.interface';
import {ITabTypes} from '../../shared/interfaces/types.interface';
import {DataService} from '../../shared/services/data.service';
import {ToastrService} from 'ngx-toastr';

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
   * Variable spinner
   * @type {boolean}
   * @memberof DetailsShiftsComponent
   */

  public spinner: boolean = false;

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
   * @param {DataService} dataService
   * @memberof DetailsShiftsComponent
   */

  constructor(public route: ActivatedRoute,
              public shiftsService: ShiftsService,
              public localStorage: LocalStorageService,
              public httpService: HttpService,
              public dataService: DataService,
              public router: Router,
              private toastr: ToastrService) {
  }

  /**
   * Method ngOnInit
   * @returns {void}
   * @memberof DetailsShiftsComponent
   */

  ngOnInit(): void {
    this.dataService.dataSmallSpinner$.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(this.spinnerShow.bind(this));
    this.dataService.dataSmallSpinner$.next(true);
    this.dataService.dataSave$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(this.saveShift.bind(this));
    this.tab = this.localStorage.retrieve('tab');
    this.shiftActiveId = this.route.snapshot.params['id'];

    if (this.dataService[`${FLOW[this.tab]}`] === undefined) {
      console.log(this.tab);
      this.httpService.getShifts(this.tab);
      this.dataService[`${FLOW[this.tab]}`].pipe(takeUntil(this.ngUnsubscribe)).subscribe();
    }

    if (this.shiftActiveId === 'new') {
      this.headerDescription = 'new request';
    }

    // if (this.tab === 'my requests') {
    //   this.initForm();
    // }

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
        if (this.shiftActive['item'] === undefined) {
          console.log('sdfsdf');
          this.router.navigate(['/' + this.route.snapshot.params['group'], 'shifts']);
        } else {
          this.headerDescription = this.shiftActive['item'].shiftTitle;
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
            console.log('shiftActive details', this.shiftActive);
            if (!this.shiftActive['item'].isDropRequest && !this.shiftActive['item'].isPickupRequest) {
              this.status = STATUS['scheduled'];
            } else {
              this.status = ' ';
            }
          }
          //
          // if (this.route.snapshot.params['id'] !== 'new') {
          //   this.setDataForm();
          // }
          this.setFooterRequest();
        }

      }
    );

    // this.shiftActive = this.dataService[`${FLOW[this.tab]}`].find(item => item.ID === this.shiftActiveId);
    // if (this.shiftActive !== undefined) {
    //     this.headerDescription = this.shiftActive.job; // TODO It's shiftTitle: from getDataShift() method - need replace
    // }

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
    this.dataService.dataSmallSpinner$.next(false);
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
    this.httpService.deleteShifts(this.route.snapshot.params['id']).subscribe();
    this.router.navigate(['/' + this.route.snapshot.params['group'], 'shifts']);
    // TODO - method for delete shift
  }

  /**
   * Method for save shift- method work only if we receive object
   * @returns {void}
   * @param {string | object} value
   * @memberof DetailsShiftsComponent
   */

  saveShift(value: string | object): void {
    if (typeof value === 'object') {
      this.httpService.patchShifts(this.route.snapshot.params['id'], <object>value).subscribe((resp) => {
        this.toastr.success('Save success', 'Success');
        this.dataService[`${FLOW[this.tab]}`].subscribe((data) => {
          for (const key in data['items']) {
            if (data['items'][key].shiftID === resp.items[0].shiftID) {
              data['items'][key] = resp.items[0];
            }
          }
        });
        this.router.navigate(['/' + this.route.snapshot.params['group'], 'shifts']);
      });
    }
    // TODO - method for save shift
  }

  /**
   * Method fo show spinner
   * @returns {void}
   * @param {boolean} event
   * @memberof DetailsShiftsComponent
   */

  spinnerShow(event: boolean): void {
    console.log('spinnerShow');
    this.spinner = event;
  }
}
