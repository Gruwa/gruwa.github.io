import {Component, Input, OnInit} from '@angular/core';
import {ITabTypes} from '../../interfaces/types.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {IForm} from '../../interfaces/form.interface';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import * as moment from 'moment';
import {LocalStorageService} from 'ngx-webstorage';
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

  selected: string;

  /**
   * Input variable shiftActive
   * @type {object}
   * @memberof ListFieldsComponent
   */

  @Input() shiftActive: object;

  /**
   * Variable status
   * @type {string}
   * @memberof FormComponent
   */

  @Input() tab: ITabTypes;

  constructor(public router: Router,
              public route: ActivatedRoute,
              public localStorage: LocalStorageService,
              private fb: FormBuilder) {
  }

  /**
   * Method ngOnInit
   * @returns {void}
   * @memberof FormComponent
   */

  ngOnInit(): void {
    this.tab === 'my requests' ? this.availbleInput = false : this.availbleInput = true;

    if (this.route.snapshot.params['id'] !== 'new') {
      this.initForm();
      this.setDataForm();
    } else {
      this.initForm();
    }

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
  }

  /**
   * Method for set data in form
   * @returns {void}
   * @memberof FormComponent
   */

  setDataForm(): void {

    console.log(this.shiftActive);
    this.selected = this.shiftActive['item'].locationID;
    this.shiftGroup = this.fb.group({
      shiftTitle: this.localStorage.retrieve('tab'),
      date: moment(this.shiftActive['item'].dateFrom),
      startTime: this.shiftActive['item'].dateFrom,
      endTime: this.shiftActive['item'].dateTo,
      // location: this.shiftActive['item'].location,
      locationID: this.shiftActive['item'].locationID,
      stationID: this.shiftActive['item'].stationID,
      jobID: this.shiftActive['item'].jobID,
      // station: this.shiftActive['item'].station,
      // job: this.shiftActive['item'].job,
      status: 'this.status',
      // locationList: this.shiftActive['locationList'],
      // stationList: this.shiftActive['stationList'],
      // jobList: this.shiftActive['jobList']
    });
    console.log('form', this.shiftGroup);
    console.log(this.shiftGroup.get('locationID').value);
  }

}

