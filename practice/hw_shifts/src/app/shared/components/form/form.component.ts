import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ITabTypes} from '../../interfaces/types.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {IForm} from '../../interfaces/form.interface';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import * as moment from 'moment';
import {LocalStorageService} from 'ngx-webstorage';
import {DataService} from '../../services/data.service';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import {IShift} from '../../interfaces/shift.interface';
import {log} from 'util';
// import {default as _rollupMoment} from 'moment';

// const moment = _rollupMoment || _moment;

export const SHIFTS_DATE_FORMATS = {
  parse: {
    dateInput: 'dd/mm/yyyy',
  },
  display: {
    dateInput: 'dd/mm/yyyy',
    monthYearLabel: 'LL',
    dateA11yLabel: 'dd/mm/yyyy',
    monthYearA11yLabel: 'LL',
  },
};

/**
 * FLOW for api link
 */

const FLOW = {
  upcoming: 'dataShiftsUpcoming$',
  'my requests': 'dataShiftsMyReq$',
  available: 'dataShiftsAvailable$'
};

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: SHIFTS_DATE_FORMATS},
  ],
})
export class FormComponent implements OnInit, OnDestroy {

  /**
   * Variable shift
   * @type {IShift}
   * @memberof ListFieldsComponent
   */

  public shift: object;

  /**
   * Variable availbleInput
   * @type {boolean}
   * @memberof FormComponent
   */

  public availbleInput: boolean;

  /**
   * Variable shiftForm
   * @type {IForm}
   * @memberof FormComponent
   */

  public shiftGroup: FormGroup;

  /**
   * Variable of ngUnsubscribe
   * @type {Subject<void>}
   * @memberof ContentShiftsComponent
   */

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  /**
   * Input variable status
   * @type {string}
   * @memberof FormComponent
   */

  @Input() status: string;

  /**
   * Input variable shiftActive
   * @type {object}
   * @memberof FormComponent
   */

  @Input() shiftActive: IShift;

  /**
   * Variable tab
   * @type {ITabTypes}
   * @memberof FormComponent
   */

  @Input() tab: ITabTypes;

  constructor(public router: Router,
              public route: ActivatedRoute,
              public localStorage: LocalStorageService,
              public dataService: DataService,
              private fb: FormBuilder) {
  }

  /**
   * Method ngOnInit
   * @returns {void}
   * @memberof FormComponent
   */

  ngOnInit(): void {
    this.dataService.dataSave$.takeUntil(this.ngUnsubscribe).subscribe(this.setBody.bind(this));
    // this.tab === 'my requests' ? this.availbleInput = false : this.availbleInput = true;

    // console.log('shiftActive details', this.shiftActive);

    this.initForm();
  }

  /**
   * Method for init form
   * @returns {void}
   * @memberof FormComponent
   */

  initForm(): void {
    this.shiftGroup = this.fb.group({
      shiftTitle: ['', [Validators.required, Validators.minLength(1)]],
      date: ['', [Validators.required]],
      startTime: ['', [Validators.required]],
      endTime: ['', [Validators.required]],
      locationID: ['', [Validators.required]],
      stationID: ['', [Validators.required]],
      jobID: ['', [Validators.required]],
      status: ['', [Validators.required]]
    });
    this.shift = {
      item: {},
      locationList: [],
      stationList: [],
      jobList: []
    };

    if (this.route.snapshot.params['id'] !== 'new') {
      this.getShift();
    }
  }

  getShift(): void {
    if (this.shiftActive === undefined) {
      this.dataService[FLOW[this.localStorage.retrieve('tab')]].subscribe((resp) => {
        let array = [];

        for (const key in resp) {
          if (key === 'items') {
            array = array.concat(resp[key]);

            const item = array.find(value => value.shiftID === this.route.snapshot.params['id']);

            this.shift = {
              item: item,
              locationList: resp.locationList,
              stationList: resp.stationList,
              jobList: resp.jobList
            };
            this.setDataForm();
          }
        }
      });
    } else {
      this.shift = this.shiftActive;
      this.setDataForm();
    }
  }

  /**
   * Method for set data in form
   * @returns {void}
   * @memberof FormComponent
   */

  setDataForm(): void {
    this.shiftGroup = this.fb.group({
      shiftTitle: this.shift['item'].shiftTitle,
      date: moment(this.shift['item'].dateFrom),
      startTime: this.shift['item'].dateFrom,
      endTime: this.shift['item'].dateTo,
      locationID: this.shift['item'].locationID,
      stationID: this.shift['item'].stationID,
      jobID: this.shift['item'].jobID,
      status: this.status
    });
  }

  /**
   * Method for set data in form
   * @returns {void}
   * @memberof FormComponent
   */

  setNewData(): void {

  }

  /**
   * Method for get body
   * @returns {void}
   * @memberof DetailsShiftsComponent
   */

  setBody(value: string): void {
    if (value === 'save') {
      if (!this.shiftGroup.invalid) {
        const body = {
          'ShiftTitle': this.shiftGroup.get('shiftTitle').value,
          'JobID': this.shiftGroup.get('jobID').value,
          'StationID': this.shiftGroup.get('stationID').value,
          'DateFrom': this.shiftGroup.get('startTime').value,
          'DateTo': this.shiftGroup.get('endTime').value,
          'LocationID': this.shiftGroup.get('locationID').value,
          'ShiftID': this.shift['item'].shiftID,
          'IsDropRequest': this.shift['item'].isDropRequest,
          'IsPickupRequest': this.shift['item'].isPickupRequest,
          'Job': this.shift['jobList'].find(job => job.id === this.shiftGroup.get('jobID').value)['description'],
          'Station': this.shift['stationList'].find(station => station.id === this.shiftGroup.get('stationID').value)['description'],
          'Location': this.shift['locationList'].find(location => location.id === this.shiftGroup.get('locationID').value)['description'],
        };
        this.dataService.dataSave$.next(body);
      }
    }
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

}

