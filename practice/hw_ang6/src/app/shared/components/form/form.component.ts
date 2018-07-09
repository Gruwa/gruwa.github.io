import {
  Component, EventEmitter,
  Input, OnChanges, OnDestroy,
  OnInit, Output,
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
import {FlowService} from '../../services/flow.service';
import {debounceTime, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';


/**
 * Content Form Component
 */

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormComponent implements OnInit, OnChanges, OnDestroy {

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

  /**
   * Output action from form select
   * @memberof FormSelectComponent
   */

  @Output() outputActionMethod: EventEmitter<any> = new EventEmitter();

  /**
   * Variable of ngUnsubscribe
   * @type {Subject<void>}
   * @memberof AppComponent
   */

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private flowService: FlowService) {
  }

  /**
   * Method ngOnInit
   * @returns {void}
   * @memberof FormComponent
   */

  ngOnInit(): void {

    this.flowService.dataEventTimeOff$.pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe((event) => {
      if (event === 'save') {
        this.setBody();
      }
    });
    this.initForm();
  }

  ngOnChanges() {
    this.setDataForm();
  }

  /**
   * Method for init form
   * @returns {void}
   * @memberof FormComponent
   */

  initForm(): void {
    this.dataGroup = this.fb.group({
      dataTitle: ['', [Validators.required]],
      dateFrom: ['', []],
      dateTrough: ['', []],
      startTime: ['', [Validators.required]],
      endTime: ['', [Validators.required]],
      frequencyID: ['', [Validators.required]],
      comment: ['', []]
    });

    this.dataGroup.statusChanges.pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe( val => {
      this.changeForm(val);
    });
    this.setDataForm();
  }

  /**
   * Method for set data in form
   * @returns {void}
   * @memberof FormComponent
   */

  setDataForm(): void {
    if (this.data) {
      if (this.data['availabilityActive']) {
        this.dataGroup = this.fb.group({
          dataTitle: this.data['availabilityActive']['title'],
          dateFrom: this.data['availabilityActive']['dateFrom'],
          dateTrough: this.data['availabilityActive']['dateTrough'],
          startTime: moment(this.data['availabilityActive']['startTime'], 'hh:mm A').format('HH:mm'),
          endTime: moment(this.data['availabilityActive']['endTime'], 'hh:mm A').format('HH:mm'),
          frequencyID: this.data['availabilityActive']['frequency'],
          comment: this.data['availabilityActive']['comment']
        });
      }
    }
  }

  /**
   * Method closeOurPage for router on shifts page
   * @returns {void}
   * @memberof HeaderComponent
   */

  public changeForm(event: any): void {
    this.outputActionMethod.emit(event);
  }

  /**
   * Method for get body
   * @returns {void}
   * @memberof FormComponent
   */

  setBody(value?: string): void {

    if (!this.dataGroup.invalid) {
      const data = {
        'title': this.dataGroup.get('dataTitle').value,
        'comment': this.dataGroup.get('comment').value,
        'dateFrom': moment(new Date(this.dataGroup.get('dateFrom').value)).format('YYYY-MM-DD') + 'T00:00:00.000Z',
        'dateTrough': moment(new Date(this.dataGroup.get('dateTrough').value)).format('YYYY-MM-DD') + 'T00:00:00.000Z',
        'startTime': moment(this.dataGroup.get('startTime').value, 'HH:mm').format('hh:mm A'),
        'endTime': moment(this.dataGroup.get('endTime').value, 'HH:mm').format('hh:mm A')
      };
      console.log(data);
      // this.flowService.dataSave$.next(data);
    }
  }

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

  /**
   * Method ngOnDestroy
   * @returns {void}
   * @memberof AppComponent
   */

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}

