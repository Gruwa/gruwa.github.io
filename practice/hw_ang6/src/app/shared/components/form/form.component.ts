import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {IForm} from '../../interfaces/form.interface';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import * as moment from 'moment';
import {FlowService} from '../../services/flow.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {HttpGuardService} from '../../services/http-guard.service';
import {LocalStorageService} from 'ngx-webstorage';
import {HttpService} from '../../services/http.service';
import {DataService} from '../../services/data.service';


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
   * @param {HttpService} httpService
   * @memberof FormComponent
   */

  constructor(private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private flowService: FlowService,
              private httpGuardService: HttpGuardService,
              private localStorage: LocalStorageService,
              private dataService: DataService,
              private httpService: HttpService) {
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
    });
    this.initForm();
  }

  /**
   * Method ngOnChanges
   * @returns {void}
   * @memberof FormComponent
   */

  public ngOnChanges(): void {
    this.setDataForm();
  }

  /**
   * Method for init form
   * @returns {void}
   * @memberof FormComponent
   */

  private initForm(): void {
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
    ).subscribe(val => {
      this.changeForm(val);
    });
    this.setDataForm();
  }

  /**
   * Method for set data in form
   * @returns {void}
   * @memberof FormComponent
   */

  private setDataForm(): void {
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
   * @memberof FormComponent
   */

  public changeForm(event: any): void {
    this.outputActionMethod.emit(event);
  }

  /**
   * Method for get body
   * @returns {void}
   * @memberof FormComponent
   */

  private setBody(value?: string): void {

    if (!this.dataGroup.invalid) {
      if (!this.dataGroup.get('dateFrom').value) {
        this.dataGroup.get('dateFrom').setValue('0001-01-01');
      }
      if (!this.dataGroup.get('dateTrough').value) {
        this.dataGroup.get('dateTrough').setValue('0001-01-01');
      }

      const data = {
        'title': this.dataGroup.get('dataTitle').value,
        'comment': this.dataGroup.get('comment').value,
        'dateFrom': moment(new Date(this.dataGroup.get('dateFrom').value)).format('YYYY-MM-DD') + 'T00:00:00.000Z',
        'dateTrough': moment(new Date(this.dataGroup.get('dateTrough').value)).format('YYYY-MM-DD') + 'T00:00:00.000Z',
        'startTime': moment(this.dataGroup.get('startTime').value, 'HH:mm').format('hh:mm A'),
        'endTime': moment(this.dataGroup.get('endTime').value, 'HH:mm').format('hh:mm A')
      };

      if (this.router.url === '/availability/new') {
        this.httpService.postAvailability(data).pipe(
          takeUntil(this.ngUnsubscribe)
        ).subscribe((next) => {
          this.flowService[`${this.dataService.FLOW_AVAILABILITY[this.localStorage.retrieve('tabavailability')]}`].pipe(
            takeUntil(this.ngUnsubscribe)
          ).subscribe(
            (items) => {
              items['items'].push(next['Data']);
              this.router.navigate(['/availability']);
            });
        });
      } else {
        this.httpService.patchAvailability(data, this.route.snapshot.params['id']).pipe(
          takeUntil(this.ngUnsubscribe)
        ).subscribe((next) => {
          this.flowService[`${this.dataService.FLOW_AVAILABILITY[this.localStorage.retrieve('tabavailability')]}`].pipe(
            takeUntil(this.ngUnsubscribe)
          ).subscribe(
            (items) => {
              for (const key in items['items']) {
                if (items['items'][key].id === next['Data'].id) {
                  items['items'][key] = next['Data'];
                }
              }
              this.router.navigate(['/availability']);
            });
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

