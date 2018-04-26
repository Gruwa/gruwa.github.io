import {Component, Input, OnInit} from '@angular/core';
import {ITabTypes} from '../../interfaces/types.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {IForm} from '../../interfaces/form.interface';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import * as moment from 'moment';
import {LocalStorageService} from 'ngx-webstorage';
import {DataService} from '../../services/data.service';
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

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: SHIFTS_DATE_FORMATS},
  ],
})
export class FormComponent implements OnInit {

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
   * Input variable shiftActive
   * @type {object}
   * @memberof ListFieldsComponent
   */

  @Input() shiftActive: object;

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
    this.dataService.dataSave$.subscribe(this.setBody.bind(this));
    this.tab === 'my requests' ? this.availbleInput = false : this.availbleInput = true;
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
      location: ['', [Validators.required]],
      station: ['', [Validators.required]],
      job: ['', [Validators.required]],
      status: ['', [Validators.required]]
    });

    if (this.route.snapshot.params['id'] !== 'new') {
      this.setDataForm();
    }
  }

  /**
   * Method for set data in form
   * @returns {void}
   * @memberof FormComponent
   */

  setDataForm(): void {

    // if ( ) {
    //   this.shiftActive[item]
    // }

    console.log(this.shiftActive);
    this.shiftGroup = this.fb.group({
      shiftTitle: this.localStorage.retrieve('tab'),
      date: moment(this.shiftActive['item'].dateFrom),
      startTime: this.shiftActive['item'].dateFrom,
      endTime: this.shiftActive['item'].dateTo,
      locationID: this.shiftActive['item'].locationID,
      stationID: this.shiftActive['item'].stationID,
      jobID: this.shiftActive['item'].jobID,
      status: ''
    });
    console.log('form', this.shiftGroup);
    console.log(this.shiftGroup.get('locationID').value);
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
    console.log(value);
    if (value === 'save') {
      const body = {
        'shiftID': value['Items'].ShiftID,
        'isDropRequest': value['Items'].IsDropRequest,
        'isPickupRequest': value['Items'].IsPickupRequest,
        'job': value['Items'].Job,
        'jobID': value['Items'].JobID,
        'station': value['Items'].Station,
        'stationID': value['Items'].StationID,
        'dateFrom': value['Items'].DateFrom,
        'dateTo': value['Items'].DateTo,
        'location': value['Items'].Location,
        'locationID': value['Items'].LocationID
      };
      this.dataService.dataSave$.next(body);
    }
    this.router.navigate(['/' + this.route.snapshot.params['group'], 'shifts']);
    // TODO - method for save shift
  }

}

