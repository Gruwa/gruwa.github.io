import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ShiftsService} from '../services/shifts.service';
import {LocalStorageService} from 'ngx-webstorage';
import {HttpService} from '../../shared/services/http.service';
import {IFooterRequest} from '../../shared/interfaces/types.interface';
import {ITabTypesShifts} from '../../shared/interfaces/types.interface';
import {FlowService} from '../../shared/services/flow.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';
import {DataService} from '../../shared/services/data.service';
import {IShiftMArkState} from '../../shared/interfaces/mark-state-shift.interface';

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
   * @type {ITabTypesShifts}
   * @memberof DetailsShiftsComponent
   */

  public tab: ITabTypesShifts = 'upcoming';

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
   * @param {FlowService} flowService
   * @param {ToastrService} toastr
   * @param {DataService} dataService
   * @memberof DetailsShiftsComponent
   */

  constructor(private route: ActivatedRoute,
              private shiftsService: ShiftsService,
              private localStorage: LocalStorageService,
              private httpService: HttpService,
              private flowService: FlowService,
              private router: Router,
              private toastr: ToastrService,
              private dataService: DataService) {
  }

  /**
   * Method ngOnInit
   * @returns {void}
   * @memberof DetailsShiftsComponent
   */

  ngOnInit(): void {
    this.flowService.dataSmallSpinner$.pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe(this.spinnerShow.bind(this));
    this.flowService.dataSmallSpinner$.next(true);
    // this.flowService.dataSave$.pipe(
    //   takeUntil(this.ngUnsubscribe)
    // ).subscribe(this.saveShift.bind(this));
    this.tab = this.localStorage.retrieve('tab');
    this.shiftActiveId = this.route.snapshot.params['id'];

    if (this.flowService[`${this.dataService.FLOW[this.tab]}`] === undefined) {
      console.log(this.tab);
      this.httpService.getShifts(this.tab);
      this.flowService[`${this.dataService.FLOW[this.tab]}`].pipe(
        takeUntil(this.ngUnsubscribe)
      ).subscribe();
    }

    if (this.shiftActiveId === 'new') {
      this.headerDescription = 'new request';
    }

    this.getShifts();
  }

  /**
   * Method ngOnDestroy
   * @returns {void}
   * @memberof DetailsShiftsComponent
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
    this.flowService[`${this.dataService.FLOW[this.tab]}`].subscribe(
      (value) => {

        for (const i in this.dataService.FLOW) {
          if (this.flowService[`${this.dataService.FLOW[i]}`] === undefined) {
            this.httpService.getShifts(<ITabTypesShifts>i);
          }
        }

        let item: any = {};

        // if (this.route.snapshot.params['id'] !== 'new') {
        item = value['items'].find(result => result.shiftID === this.shiftActiveId);
        // }
        this.shiftActive = {
          item: item,
          locationList: value.locationList,
          stationList: value.stationList,
          jobList: value.jobList
        };
        if (this.shiftActive['item'] === undefined) {
          this.router.navigate(['/' + this.route.snapshot.params['group'], 'shifts']);
        } else {
          this.headerDescription = this.shiftActive['item'].shiftTitle;
          // if (this.tab === 'upcoming' || this.tab === 'available') {
          if (this.shiftActive['item'].isDropRequest && this.shiftActive['item'].isPickupRequest) {
            this.status = this.dataService.STATUS[`${this.dataService.SHIFT_REQUEST[this.tab]}`];
            this.footerActive = false;
          }
          if (!this.shiftActive['item'].isDropRequest && this.shiftActive['item'].isPickupRequest) {
            this.status = this.dataService.STATUS['pickup request'];
            this.footerActive = false;
          }
          if (!this.shiftActive['item'].isDropRequest && !this.shiftActive['item'].isPickupRequest) {
            this.status = this.dataService.STATUS['scheduled'];
            this.footerActive = true;
          }
          if (this.shiftActive['item'].isDropRequest && !this.shiftActive['item'].isPickupRequest) {
            this.status = this.dataService.STATUS['drop request'];
            this.footerActive = false;
          }
          // }
          // if (this.tab === 'my requests') {
          //   console.log('shiftActive details', this.shiftActive);
          //   if (!this.shiftActive['item'].isDropRequest && !this.shiftActive['item'].isPickupRequest) {
          //     this.status = this.dataService.STATUS['scheduled'];
          //   } else {
          //     this.status = ' ';
          //   }
          // }
          this.setFooterRequest();
        }

      }
    );
  }

  /**
   * Method for set description for FooterRequest
   * @returns {void}
   * @memberof DetailsShiftsComponent
   */

  setFooterRequest(): void {
    if (this.tab === 'upcoming') {
      this.footerActive ? this.footerDescription = this.dataService.FOOTER_REQUESTS[0]
        : this.footerDescription = this.dataService.FOOTER_REQUESTS[1];
    }
    // if (this.tab === 'my requests') {
    //   this.footerDescription = this.dataService.FOOTER_REQUESTS[4];
    // }
    if (this.tab === 'available') {
      this.footerActive ? this.footerDescription = this.dataService.FOOTER_REQUESTS[2]
        : this.footerDescription = this.dataService.FOOTER_REQUESTS[3];
    }
    this.flowService.dataSmallSpinner$.next(false);
  }

  /**
   * Method for click on footer
   * @returns {void}
   * @memberof DetailsShiftsComponent
   */

  clickFooter(): void {
    this.footerActive = !this.footerActive;

    // if (this.tab === 'upcoming' || this.tab === 'available') {
    if (!this.footerActive) {
      this.shiftActive['item'][`${this.dataService.SHIFT_ACTIVE[this.tab]}`] = true;
      if (this.tab === 'upcoming') {
        this.status = this.dataService.STATUS['drop request'];
      }
      if (this.tab === 'available') {
        this.status = this.dataService.STATUS['pickup request'];
      }
    } else {
      this.shiftActive['item'].isDropRequest = false;
      this.shiftActive['item'].isPickupRequest = false;
      this.status = this.dataService.STATUS['scheduled'];
    }

    if (this.shiftActive) {

    }
    // this.flowService.dataHttpRequest$.subscribe((data) => {
    //   if (data.patchMarkState) {
    //     console.log('eeeeeeeeeeeeeeeeeee');
    //   }
    // });

    // this.flowService.dataHttpRequest$.next({
    //   patchMarkState: {
    //     id: this.route.snapshot.params['id'],
    //     data: {
    //       'isDropRequest': this.shiftActive['item'].isDropRequest,
    //       'isPickupRequest': this.shiftActive['item'].isPickupRequest
    //     }
    //   }
    // });
    // this.flowService.dataHttpResponse$.pipe(
    //   takeUntil(this.ngUnsubscribe)
    // ).subscribe((resp) => {
    //   if (resp.patchMarkState) {
    //     this.toastr.success(this.dataService.httpSuccessResponse['save']);
    //     this.flowService[`${this.dataService.FLOW[this.tab]}`].subscribe((data) => {
    //       for (const key in data['items']) {
    //         if (data['items'][key].shiftID === resp.patchMarkState.items[0].shiftID) {
    //           data['items'][key] = resp.patchMarkState.items[0];
    //         }
    //       }
    //     });
    //   }
    // });

    console.log(this.shiftActive['item']);
    const markState: object = {
      'isDropRequest': this.shiftActive['item'].isDropRequest,
      'isPickupRequest': this.shiftActive['item'].isPickupRequest
    };
    console.log(markState);
    this.httpService.patchMarkState(this.route.snapshot.params['id'], markState).subscribe((resp) => {
      console.log('go save markState');
      this.toastr.success(this.dataService.httpSuccessResponse['save']);
      this.flowService[`${this.dataService.FLOW[this.tab]}`].subscribe((data) => {
        for (const key in data['items']) {
          if (data['items'][key].shiftID === resp.items[0].shiftID) {
            data['items'][key] = resp.items[0];
          }
        }
      });
    });
    this.setFooterRequest();
  }

  // /**
  //  * Method for delete shift
  //  * @returns {void}
  //  * @memberof DetailsShiftsComponent
  //  */
  //
  // deleteShift(): void {
  //   console.log('DELETE');
  //   this.httpService.deleteShifts(this.route.snapshot.params['id']).subscribe(() => {
  //     this.toastr.success(this.dataService.httpSuccessResponse['delete']);
  //     this.flowService[`${this.dataService.FLOW[this.tab]}`].subscribe((data) => {
  //       for (const key in data['items']) {
  //
  //         if (data['items'][key].shiftID === this.route.snapshot.params['id']) {
  //           console.log(key);
  //           data['items'].splice(key, 1);
  //         }
  //       }
  //     });
  //     this.router.navigate(['/' + this.route.snapshot.params['group'], 'shifts']);
  //   });
  //   // TODO - method for delete shift
  // }

  // /**
  //  * Method for save shift- method work only if we receive object
  //  * @returns {void}
  //  * @param {string | object} value
  //  * @memberof DetailsShiftsComponent
  //  */
  //
  // saveShift(value: string | object): void {
  //   if (typeof value === 'object') {
  //     this.httpService.patchShifts(this.route.snapshot.params['id'], <object>value).subscribe((resp) => {
  //       this.toastr.success(this.dataService.httpSuccessResponse['save']);
  //       this.flowService[`${this.dataService.FLOW[this.tab]}`].subscribe((data) => {
  //         for (const key in data['items']) {
  //           if (data['items'][key].shiftID === resp.items[0].shiftID) {
  //             data['items'][key] = resp.items[0];
  //           }
  //         }
  //       });
  //       this.router.navigate(['/' + this.route.snapshot.params['group'], 'shifts']);
  //     });
  //   }
  //   // TODO - method for save shift
  // }

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
