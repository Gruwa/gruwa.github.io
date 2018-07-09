import {Component, OnDestroy, OnInit} from '@angular/core';
import {debounceTime, takeUntil} from 'rxjs/operators';
import {Validators} from '@angular/forms';
import {ITabTypesAvailability} from '../../shared/interfaces/types.interface';
import {DataService} from '../../shared/services/data.service';
import {FlowService} from '../../shared/services/flow.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ITimeOff} from '../../shared/interfaces/timeoff.interface';
import {LocalStorageService} from 'ngx-webstorage';
import {forEach} from '@angular/router/src/utils/collection';
import {Subject} from 'rxjs';
import {HttpService} from '../../shared/services/http.service';
import {AvailabilityService} from '../services/availability.service';

@Component({
  selector: 'app-edit-availability',
  templateUrl: './edit-availability.component.html',
  styleUrls: ['./edit-availability.component.scss']
})
export class EditAvailabilityComponent implements OnInit, OnDestroy {

  /**
   * Variable formDescription
   * @type {IShift}
   * @memberof FormComponent
   */

  public formDescriptions;

  /**
   * Variable of iconLeft
   * @type {string}
   * @memberof SettingsComponent
   */

  public iconLeft: string = 'close';

  /**
   * Variable of iconRight
   * @type {string}
   * @memberof SettingsComponent
   */

  public iconRight: 'delete' | 'save' = 'delete';

  /**
   * Variable descriptionLeft
   * @type {string}
   * @memberof SettingsComponent
   */

  public descriptionLeft: 'time off' | 'volunteer' = 'time off';

  /**
   * Variable descriptionRight
   * @type {string}
   * @memberof SettingsComponent
   */

  public descriptionRight: string;

  /**
   * Variable descriptionRightActive
   * @type {string}
   * @memberof SettingsComponent
   */

  public descriptionRightActive: 'VALID' | 'INVALID' = 'VALID';

  /**
   * Variable availabilityActive
   * @type {object}
   * @memberof FormComponent
   */

  public availabilityActive;

  //
  // /**
  //  * Variable availbleInput
  //  * @type {boolean}
  //  * @memberof FormComponent
  //  */
  //
  // public availbleInput: boolean;
  //
  // /**
  //  * Variable shiftForm
  //  * @type {IForm}
  //  * @memberof FormComponent
  //  */
  //
  // public shiftGroup: FormGroup;
  //
  /**
   * Variable of ngUnsubscribe
   * @type {Subject<void>}
   * @memberof FormComponent
   */

  private ngUnsubscribe: Subject<void> = new Subject<void>();
  //
  // /**
  //  * Input variable status
  //  * @type {string}
  //  * @memberof FormComponent
  //  */
  //
  // @Input() status: string;
  //

  //
  // /**
  //  * Variable tab
  //  * @type {ITabTypesShifts}
  //  * @memberof FormComponent
  //  */
  //
  // @Input() tab: ITabTypesShifts;
  //
  /**
   * Creates an instance of FormComponent
   * @param {Router} router
   * @param {ActivatedRoute} route
   * @param {FormBuilder} fb
   * @param {DataService} dataService
   * @Param {Router} router
   * @memberof FormComponent
   */

  constructor(private dataService: DataService,
              private router: Router,
              private route: ActivatedRoute,
              private localStorage: LocalStorageService,
              private flowService: FlowService,
              private httpService: HttpService,
              private availabilityService: AvailabilityService) {
  }

  ngOnInit() {
    this.descriptionLeft = this.localStorage.retrieve('tabavailability');
    this.formDescriptions = this.dataService.LIST_DESCRIPTIONS;

    for (const i in this.dataService.FLOW_AVAILABILITY) {
      if (!this.flowService[`${this.dataService.FLOW_AVAILABILITY[i]}`]) {
        if (this.router.url === '/availability/new') {

          this.httpService.getAvailability(<ITabTypesAvailability>i);
          this.router.navigate(['/availability']);
        }
      }
    }


    this.flowService[`${this.dataService.FLOW_AVAILABILITY[this.localStorage.retrieve('tabavailability')]}`].pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe(
      (items) => {
        console.log(items);
        if (this.route.snapshot.params['id'] !== 'new') {
          this.availabilityActive = this.availabilityService.getAvailabilityActive(items, this.route.snapshot.params['id']);
          this.availabilityActive = {
            availabilityActive: this.availabilityService.getAvailabilityActive(items, this.route.snapshot.params['id']),
            frequencyList: items['frequencyList']
          };
        } else {
          this.availabilityActive = {
            frequencyList: items['frequencyList']
          };
        }
      });


    // this.flowService.dataSave$.pipe(
    //   takeUntil(this.ngUnsubscribe)
    // ).subscribe(this.setBody.bind(this));
    // // this.tab === 'my requests' ? this.availbleInput = false : this.availbleInput = true;
    //
    // // console.log('shiftActive details', this.shiftActive);
    //
    // this.initForm();
  }


  /**
   * Method fo show spinner
   * @returns {void}
   * @param {any} event
   * @memberof ShiftsComponent
   */

  public showSideBar(event?: any): void {
    if (event === 'iconLeft') {
      this.router.navigate(['/availability']);
    }
    if (event === 'iconRight') {
      console.log('trash');
    }
    if (event === 'descriptionRight') {
      this.flowService.dataEventTimeOff$.next('save');
      console.log('save');
    }
    if (event === 'descriptionRightDeactivate') {
      console.log('You have empty required fields');
    }
  }

  changeForm(event: any) {
    this.descriptionRightActive = event;
    this.iconRight = undefined;
    this.descriptionRight = 'save';
  }

  // /**
  //  * Method for init form
  //  * @returns {void}
  //  * @memberof FormComponent
  //  */
  //
  // initForm(): void {
  //   this.shiftGroup = this.fb.group({
  //     shiftTitle: ['', [Validators.required, Validators.minLength(1)]],
  //     date: ['', [Validators.required]],
  //     startTime: ['', [Validators.required]],
  //     endTime: ['', [Validators.required]],
  //     locationID: ['', [Validators.required]],
  //     stationID: ['', [Validators.required]],
  //     jobID: ['', [Validators.required]],
  //     status: ['', [Validators.required]]
  //   });
  //   this.shift = {
  //     item: {},
  //     locationList: [],
  //     stationList: [],
  //     jobList: []
  //   };
  //
  //   if (this.route.snapshot.params['id'] !== 'new') {
  //     this.getShift();
  //   }
  // }
  //
  // getShift(): void {
  //   if (this.shiftActive === undefined) {
  //     this.flowService[this.dataService.FLOW[this.localStorage.retrieve('tab')]].pipe(
  //       takeUntil(this.ngUnsubscribe)
  //     ).subscribe((resp) => {
  //       let array = [];
  //
  //       for (const key in resp) {
  //         if (key === 'items') {
  //           array = array.concat(resp[key]);
  //
  //           const item = array.find(value => value.shiftID === this.route.snapshot.params['id']);
  //
  //           this.shift = {
  //             item: item,
  //             locationList: resp.locationList,
  //             stationList: resp.stationList,
  //             jobList: resp.jobList
  //           };
  //           if (!this.shift['item'].isDropRequest && !this.shift['item'].isPickupRequest) {
  //             this.status = this.dataService.STATUS['scheduled'];
  //           } else {
  //             this.status = ' ';
  //           }
  //           this.setDataForm();
  //         }
  //       }
  //     });
  //   } else {
  //     this.shift = this.shiftActive;
  //     this.setDataForm();
  //   }
  // }
  //
  // /**
  //  * Method for set data in form
  //  * @returns {void}
  //  * @memberof FormComponent
  //  */
  //
  // setDataForm(): void {
  //   this.shiftGroup = this.fb.group({
  //     shiftTitle: this.shift['item'].shiftTitle,
  //     date: this.shift['item'].dateFrom,
  //     startTime: moment(this.shift['item'].dateFrom).utcOffset(0, false).format('HH:mm'),
  //     endTime: moment(this.shift['item'].dateTo).utcOffset(0, false).format('HH:mm'),
  //     locationID: this.shift['item'].locationID,
  //     stationID: this.shift['item'].stationID,
  //     jobID: this.shift['item'].jobID,
  //     status: this.status
  //   });
  // }
  //
  // /**
  //  * Method for set data in form
  //  * @returns {void}
  //  * @memberof FormComponent
  //  */
  //
  // setNewData(): void {
  //
  // }
  //
  // /**
  //  * Method for get body
  //  * @returns {void}
  //  * @memberof FormComponent
  //  */
  //
  // setBody(value: string): void {
  //   if (value === 'save') {
  //     if (!this.shiftGroup.invalid) {
  //       const body = {
  //         'ShiftTitle': this.shiftGroup.get('shiftTitle').value,
  //         'JobID': this.shiftGroup.get('jobID').value,
  //         'StationID': this.shiftGroup.get('stationID').value,
  //         'DateFrom': this.shiftsService.createDate(
  //           this.shiftGroup.get('date').value,
  //           this.shiftGroup.get('startTime').value,
  //           this.shiftGroup.get('endTime').value)[0],
  //         'DateTo': this.shiftsService.createDate(
  //           this.shiftGroup.get('date').value,
  //           this.shiftGroup.get('startTime').value,
  //           this.shiftGroup.get('endTime').value)[1],
  //         'LocationID': this.shiftGroup.get('locationID').value,
  //         'ShiftID': this.shift['item'].shiftID,
  //         'IsDropRequest': this.shift['item'].isDropRequest,
  //         'IsPickupRequest': this.shift['item'].isPickupRequest,
  //         'Job': this.shift['jobList'].find(job => job.id === this.shiftGroup.get('jobID').value)['description'],
  //         'Station': this.shift['stationList'].find(station => station.id === this.shiftGroup.get('stationID').value)['description'],
  //         'Location': this.shift['locationList'].find(location => location.id === this.shiftGroup.get('locationID').value)['description'],
  //       };
  //       this.flowService.dataSave$.next(body);
  //     }
  //   }
  // }
  //
  /**
   * Method ngOnDestroy
   * @returns {void}
   * @memberof FormComponent
   */

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
