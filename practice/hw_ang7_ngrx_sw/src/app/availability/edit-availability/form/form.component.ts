import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output, SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {IForm} from '../../../shared/interfaces/form.interface';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import * as moment from 'moment';
import {FlowService} from '../../../shared/services/flow.service';
import {
  debounceTime,
  takeUntil
} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {HttpGuardService} from '../../../shared/services/http-guard.service';
import {LocalStorageService} from 'ngx-webstorage';
import {HttpService} from '../../../shared/services/http.service';
import {DataService} from '../../../shared/services/data.service';
import {ToastrService} from 'ngx-toastr';
import {AvailabilityService} from '../../services/availability.service';
import {Async} from '../../../shared/models/decorators';

/**
 * Content Form Component
 */

@Component({
  selector: 'sw-app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormComponent implements OnInit, OnChanges, OnDestroy {

  /**
   * Variable dateFromFirst
   * @type {boolean}
   * @memberof FormComponent
   */

  public dateFromFirst: boolean = false;

  /**
   * Variable datepickerFilterDateTrough
   * @type {any}
   * @memberof FormComponent
   */

  public datepickerFilterDateTrough;

  /**
   * Variable valueDisabled
   * @type {boolean}
   * @memberof FormComponent
   */

  public valueDisabled: boolean = false;

  /**
   * Variable shiftForm
   * @type {IForm}
   * @memberof FormComponent
   */

  public dataGroup: FormGroup;

  /**
   * Variable postAvailability
   * @type {boolean}
   * @memberof FormComponent
   */

  private postAvailability: boolean = true;

  /**
   * Variable of ngUnsubscribe
   * @type {Subject<void>}
   * @memberof FormComponent
   */

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  /**
   * Input variable status
   * @type {string}
   * @memberof FormComponent
   */

  @Input() data: object;

  /**
   * Local Async data
   * @type {object}
   * @memberof FormComponent
   */

  @Async() data$;

  /**
   * Input variable description of form inputs
   * @type {array}
   * @memberof FormComponent
   */

  @Input() descriptions: object;

  /**
   * Output action from form select
   * @memberof FormComponent
   */

  @Output() outputActionMethod: EventEmitter<any> = new EventEmitter();

  /**
   * Creates an instance of FormComponent
   * @param {Router} router
   * @param {ActivatedRoute} route
   * @param {FormBuilder} fb
   * @param {FlowService} flowService
   * @param {HttpGuardService} httpGuardService
   * @param {LocalStorageService} localStorage
   * @param {DataService} dataService
   * @param {ToastrService} toastr
   * @param {HttpService} httpService
   * @param {AvailabilityService} availabilityService
   * @memberof FormComponent
   */

  constructor(public router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private flowService: FlowService,
              private httpGuardService: HttpGuardService,
              public localStorage: LocalStorageService,
              public dataService: DataService,
              private toastr: ToastrService,
              private httpService: HttpService,
              private availabilityService: AvailabilityService) {
  }

  /**
   * Method ngOnInit
   * @returns {void}
   * @memberof FormComponent
   */

  public ngOnInit(): void {
    this.flowService.dataEventTimeOff$.pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe((event) => {
      if (event === 'save') {
        this.setBody();
      }
      if (event === 'required') {
        console.log(event);
      }
    });
    this.initForm();
  }

  /**
   * Method event of ngOnChanges
   * 1. init form
   * 2. pushing new data in flow when it change
   * @param {SimpleChanges} changes
   * @returns {void}
   * @memberof FormComponent
   */

  public ngOnChanges(changes?: SimpleChanges): void {
    if (changes.data) {
      this.data$.next(this.data);
    }

  }

  /**
   * Method for init form
   * @returns {void}
   * @memberof FormComponent
   */

  private initForm(): void {
    this.dataGroup = this.fb.group({
      title: [{value: '', disabled: this.valueDisabled}, [Validators.required]],
      dateFrom: [{value: '', disabled: this.valueDisabled}, []],
      dateTrough: [{value: '', disabled: this.valueDisabled}, []],
      startTime: [{value: '', disabled: this.valueDisabled}, []],
      endTime: [{value: '', disabled: this.valueDisabled}, []],
      frequency: [{value: '', disabled: this.valueDisabled}, [Validators.required]],
      comment: [{value: '', disabled: this.valueDisabled}, []],
      requestDescription: [{value: '', disabled: this.valueDisabled}, []],
      frequencyOption: [{value: '1', disabled: this.valueDisabled}, [Validators.required]]
    });

    this.dataGroup.get('dateFrom').valueChanges.pipe(
      takeUntil(this.ngUnsubscribe),
      debounceTime(30)
    ).subscribe((date) => {
      this.datepickerFilterDateTrough = date;

      if (this.dateFromFirst) {
        this.dataGroup.get('dateTrough').patchValue(null);
      }

      this.dateFromFirst = true;
    });

    this.setDataForm();
  }

  /**
   * Method for set data in form
   * @returns {void}
   * @memberof FormComponent
   */

  private setDataForm(): void {
    this.data$.pipe(
      takeUntil(this.ngUnsubscribe),
      debounceTime(30)
    ).subscribe(value => {
      if (value) {
        if (value['availabilityActive']) {
          if (value['availabilityActive']
            && value['availabilityActive']['requestDescription'] !== 'New'
            && this.localStorage.retrieve('tabavailability') !== 'volunteer') {
            this.valueDisabled = true;
          }

          this.dataGroup = this.fb.group({
            title: [{value: '', disabled: this.valueDisabled}, [Validators.required]],
            dateFrom: [{value: '', disabled: this.valueDisabled}, []],
            dateTrough: [{value: '', disabled: this.valueDisabled}, []],
            startTime: [{value: '', disabled: this.valueDisabled}, []],
            endTime: [{value: '', disabled: this.valueDisabled}, []],
            frequency: [{value: '', disabled: this.valueDisabled}, [Validators.required]],
            comment: [{value: '', disabled: this.valueDisabled}, []],
            requestDescription: [{value: '', disabled: this.valueDisabled}, []],
            frequencyOption: [{value: '1', disabled: this.valueDisabled}, []]
          });

          this.dataGroup.get('dateFrom').valueChanges.pipe(
            takeUntil(this.ngUnsubscribe),
            debounceTime(30)
          ).subscribe((date) => {
            this.datepickerFilterDateTrough = date;

            if (this.dateFromFirst) {
              this.dataGroup.get('dateTrough').patchValue(null);
            }

            this.dateFromFirst = true;
          });
          this.dataGroup.get('frequency').valueChanges.pipe(
            takeUntil(this.ngUnsubscribe)
          ).subscribe((date) => {
            if (date === 'D') {
              this.dataGroup.get('frequencyOption').patchValue(' ');
            }
          });

          for (let i = 0; i < this.dataService.LIST_DESCRIPTIONS_KEY_FORM_AVAILABILITY.length; i++) {
            if (this.dataService.LIST_DESCRIPTIONS_KEY_FORM_AVAILABILITY[i] === 'startTime' ||
              this.dataService.LIST_DESCRIPTIONS_KEY_FORM_AVAILABILITY[i] === 'endTime') {
              this.dataGroup.get(this.dataService.LIST_DESCRIPTIONS_KEY_FORM_AVAILABILITY[i])
                .patchValue(moment(value['availabilityActive'][this.dataService.LIST_DESCRIPTIONS_KEY_FORM_AVAILABILITY[i]],
                  'hh:mm A').format('HH:mm'));
            } else if (this.dataService.LIST_DESCRIPTIONS_KEY_FORM_AVAILABILITY[i] === 'dateFrom' ||
              this.dataService.LIST_DESCRIPTIONS_KEY_FORM_AVAILABILITY[i] === 'dateTrough') {
              this.dataGroup.get(this.dataService.LIST_DESCRIPTIONS_KEY_FORM_AVAILABILITY[i])
                .patchValue(moment(value['availabilityActive'][this.dataService.LIST_DESCRIPTIONS_KEY_FORM_AVAILABILITY[i]])
                  .utc().format('YYYY-MM-DD') + 'T00:00:00');
            } else {
              this.dataGroup.get(this.dataService.LIST_DESCRIPTIONS_KEY_FORM_AVAILABILITY[i])
                .patchValue(value['availabilityActive'][this.dataService.LIST_DESCRIPTIONS_KEY_FORM_AVAILABILITY[i]]);
            }
          }
        }

        this.dataGroup.get('frequency').valueChanges.pipe(
          takeUntil(this.ngUnsubscribe)
        ).subscribe(item => {
          if (item === 'W' || item === 'M') {
            this.dataGroup.get('frequencyOption').patchValue('1');
          }
        });
        this.dataGroup.statusChanges.pipe(
          takeUntil(this.ngUnsubscribe),
          debounceTime(1)
        ).subscribe(val => {
          this.outputActionMethod.emit(val);
        });
      }
    });
  }

  /**
   * Method for get body
   * @returns {void}
   * @memberof FormComponent
   */

  private setBody(value?: string): void {
    if (!this.dataGroup.invalid) {
      if (!this.dataGroup.get('dateFrom').value) {
        this.dataGroup.get('dateFrom').setValue(null);
      }
      if (!this.dataGroup.get('dateTrough').value) {
        this.dataGroup.get('dateTrough').setValue(null);
      }

      const data = {
        'title': this.dataGroup.get('title').value,
        'comment': this.dataGroup.get('comment').value,
        'dateFrom': this.dataGroup.get('dateFrom').value === null ? null
          : (
            (typeof this.dataGroup.get('dateFrom').value) === 'string' ?
              moment(this.dataGroup.get('dateFrom').value).format('YYYY-MM-DD') + 'T00:00:00.000Z' :
              this.dataGroup.get('dateFrom').value.format('YYYY-MM-DD') + 'T00:00:00.000Z'
          ),
        'dateTrough': this.dataGroup.get('dateTrough').value === null ? null
          : (
            (typeof this.dataGroup.get('dateTrough').value) === 'string' ?
              moment(this.dataGroup.get('dateTrough').value).format('YYYY-MM-DD') + 'T00:00:00.000Z' :
              this.dataGroup.get('dateTrough').value.format('YYYY-MM-DD') + 'T00:00:00.000Z'
          ),
        'startTime': this.dataGroup.get('startTime').value ? moment(this.dataGroup.get('startTime').value, 'HH:mm').format('hh:mmA') : null,
        'endTime': this.dataGroup.get('endTime').value ? moment(this.dataGroup.get('endTime').value, 'HH:mm').format('hh:mmA') : null,
        'id': this.data['availabilityActive'] ? this.data['availabilityActive'].id : null,
        'frequency': this.dataGroup.get('frequency').value,
        'frequencyOption': this.dataGroup.get('frequencyOption').value === ' ' ? null : this.dataGroup.get('frequencyOption').value
      };

      if (this.router.url === '/availability/new') {
        if (this.postAvailability) {
          this.postAvailability = false;
          this.httpService.postAvailability(data).pipe(
            takeUntil(this.ngUnsubscribe)
          ).subscribe((patchValue) => {
            this.toastr.success(this.dataService.httpSuccessResponse['save']);
            this.flowService.dataAvailability$.next(
              this.availabilityService.saveActiveAvailability(patchValue, this.route.snapshot.params['id'], this.router.url));
            this.router.navigate(['/availability']);
            this.postAvailability = true;
          });
        }
      } else {
        this.httpService.patchAvailability(data, this.route.snapshot.params['id']).pipe(
          takeUntil(this.ngUnsubscribe)
        ).subscribe((patchValue) => {
          this.toastr.success(this.dataService.httpSuccessResponse['save']);
          this.flowService.dataAvailability$.next(
            this.availabilityService.saveActiveAvailability(patchValue, this.route.snapshot.params['id'], this.router.url));
          this.router.navigate(['/availability']);
        });
      }
    }
  }

  /**
   * Method ngOnDestroy
   * @returns {void}
   * @memberof FormComponent
   */

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
