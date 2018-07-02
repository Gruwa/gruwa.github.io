import {
  Component,
  Input,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {IForm} from '../../interfaces/form.interface';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import * as moment from 'moment';


/**
 * Content Form Component
 */

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormComponent implements OnInit {

  /**
   * Variable shiftForm
   * @type {IForm}
   * @memberof FormComponent
   */

  public dataGroup: FormGroup;

  /**
   * Input variable status
   * @type {string}
   * @memberof FormComponent
   */

  @Input() data: object;

  /**
   * Input variable description of form inputs
   * @type {array}
   * @memberof FormComponent
   */

  @Input() descriptions: object;

  /**
   * Creates an instance of FormComponent
   * @param {Router} router
   * @param {ActivatedRoute} route
   * @param {FormBuilder} fb
   * @memberof FormComponent
   */

  constructor(private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder) {
  }

  /**
   * Method ngOnInit
   * @returns {void}
   * @memberof FormComponent
   */

  ngOnInit(): void {
    this.initForm();
  }

  /**
   * Method for init form
   * @returns {void}
   * @memberof FormComponent
   */

  initForm(): void {
    this.dataGroup = this.fb.group({
      dataTitle: ['', [Validators.required, Validators.minLength(1)]],
      dateFrom: ['', [Validators.required]],
      dateThrough: ['', [Validators.required]],
      startTime: ['', [Validators.required]],
      endTime: ['', [Validators.required]],
      frequencyID: ['', [Validators.required]],
      comment: ['', []]
    });
  }

  /**
   * Method for set data in form
   * @returns {void}
   * @memberof FormComponent
   */

  setDataForm(): void {
    this.dataGroup = this.fb.group({
      // shiftTitle: this.shift['item'].shiftTitle,
      // date: this.shift['item'].dateFrom,
      // startTime: moment(this.shift['item'].dateFrom).utcOffset(0, false).format('HH:mm'),
      // endTime: moment(this.shift['item'].dateTo).utcOffset(0, false).format('HH:mm'),
      // locationID: this.shift['item'].locationID,
      // stationID: this.shift['item'].stationID,
      // jobID: this.shift['item'].jobID,
      // status: this.status
    });
  }

  /**
   * Method for get body
   * @returns {void}
   * @memberof FormComponent
   */

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

}

