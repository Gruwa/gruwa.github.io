import {
  AfterViewChecked,
  ChangeDetectorRef,
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
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {Subject} from 'rxjs';
import {DataService} from '../../shared/services/data.service';
import {HttpService} from '../../shared/services/http.service';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {
  debounceTime,
  takeUntil
} from 'rxjs/operators';
import {LocalStorageService} from 'ngx-webstorage';
import {HttpGuardService} from '../../shared/services/http-guard.service';
import {FlowService} from '../../shared/services/flow.service';

@Component({
  selector: 'sw-app-form-contact-info',
  templateUrl: './form-contact-info.component.html',
  styleUrls: ['./form-contact-info.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormContactInfoComponent implements OnInit, OnChanges, AfterViewChecked, OnDestroy {

  /**
   * Variable shiftForm
   * @type {IForm}
   * @memberof FormContactInfoComponent
   */

  public dataGroup: FormGroup;

  /**
   * Variable of ngUnsubscribe
   * @type {Subject<void>}
   * @memberof FormContactInfoComponent
   */

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  /**
   * Variable of list
   * @type {object}
   * @memberof FormContactInfoComponent
   */

  public list;

  /**
   * Variable of formValid
   * @type {object}
   * @memberof FormContactInfoComponent
   */

  private formValid;

  /**
   * Input variable status
   * @type {string}
   * @memberof FormContactInfoComponent
   */

  @Input() data: object;

  /**
   * Input variable description of form inputs
   * @type {array}
   * @memberof FormContactInfoComponent
   */

  @Input() descriptions: object;

  /**
   * Output action from form select
   * @memberof FormContactInfoComponent
   */

  @Output() outputActionMethod: EventEmitter<any> = new EventEmitter();

  /**
   * Creates an instance of FormContactInfoComponent
   * @param {Router} router
   * @param {ActivatedRoute} route
   * @param {FormBuilder} fb
   * @param {FlowService} flowService
   * @param {HttpGuardService} httpGuardService
   * @param {LocalStorageService} localStorage
   * @param {DataService} dataService
   * @param {HttpService} httpService
   * @param {ChangeDetectorRef} cdRef
   * @memberof FormContactInfoComponent
   */

  constructor(private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private flowService: FlowService,
              private httpGuardService: HttpGuardService,
              private localStorage: LocalStorageService,
              private dataService: DataService,
              private httpService: HttpService,
              private cdRef: ChangeDetectorRef) {
  }

  /**
   * Method ngOnInit
   * @returns {void}
   * @memberof FormContactInfoComponent
   */

  public ngOnInit(): void {
    this.descriptions = this.dataService.LIST_FIELDS_FORM_INFO;

    this.initForm();
  }

  /**
   * Method ngOnChanges
   * @returns {void}
   * @memberof FormContactInfoComponent
   */

  public ngOnChanges(): void {
    if (this.dataGroup) {
      this.setDataForm();
    }
  }

  /**
   * Method for init form
   * @returns {void}
   * @memberof FormContactInfoComponent
   */

  private initForm(): void {
    this.dataGroup = this.fb.group({
      email: ['', []],
      phonePrimary: ['', []],
      phonePrimary0: ['', [Validators.required, Validators.maxLength(3), Validators.minLength(3)]],
      phonePrimary1: ['', [Validators.required, Validators.maxLength(3), Validators.minLength(3)]],
      phonePrimary2: ['', [Validators.required, Validators.maxLength(4), Validators.minLength(4)]],
      enableSMS: [false, []],
      cellProvider: ['', []],
      address1: ['', []],
      address2: ['', []],
      city: ['', []],
      state: ['', []],
      zip: ['', []]
    });

    this.statusChange();

    if (this.data) {
      this.setDataForm();
    }
  }

  /**
   * Method for set data in form
   * @returns {void}
   * @memberof FormContactInfoComponent
   */

  private setDataForm(): void {
    if (this.data) {
      if (this.data['contactInfo']) {
        for (let i = 0; i < this.dataService.LIST_FIELDS_KEY_FORM_INFO.length; i++) {
          for (let k = 0; k < this.data['contactInfo'].length; k++) {
            if (this.data['contactInfo'][k].id === this.dataService.LIST_FIELDS_KEY_FORM_INFO[i]) {
              this.dataGroup.get(this.dataService.LIST_FIELDS_KEY_FORM_INFO[i]).patchValue(this.data['contactInfo'][k].value);

              if (this.dataService.LIST_FIELDS_KEY_FORM_INFO[i] === 'state') {
                for (let l = 0; l < this.data['stateList'].length; l++) {
                  if (this.data['stateList'][l].id === this.data['contactInfo'][k].value) {
                    this.dataGroup.get(this.dataService.LIST_FIELDS_KEY_FORM_INFO[i]).patchValue(this.data['stateList'][l].description);
                  } else {
                    this.dataGroup.get(this.dataService.LIST_FIELDS_KEY_FORM_INFO[i]).patchValue('');
                  }
                }
              }

              if (this.data['contactInfo'][k].id === 'phonePrimary') {

                let phone = this.data['contactInfo'][k].value ? (this.data['contactInfo'][k].value).replace(/\D+/g, '') : '';

                if (phone.slice(0, 1) === '0' || phone.slice(0, 1) === '1') {
                  phone = phone.slice(1, 10);
                }

                this.dataGroup.get('phonePrimary0').patchValue(phone.slice(0, 3));
                this.dataGroup.get('phonePrimary1').patchValue(phone.slice(3, 6));
                this.dataGroup.get('phonePrimary2').patchValue(phone.slice(6));
              }
              if (this.dataService.LIST_FIELDS_KEY_FORM_INFO[i] === 'enableSMS') {
                this.list = [];
                this.list.push({
                  description: this.data['contactInfo'][k].description,
                  value: this.data['contactInfo'][k].value,
                  id: this.data['contactInfo'][k].id
                });
              }
            }
          }
        }
      }
    }
    this.flowService.dataSmallSpinner$.next(false);
  }

  /**
   * Method for status change
   * @returns {void}
   * @memberof FormContactInfoComponent
   */

  private statusChange(): void {
    this.dataGroup.statusChanges.pipe(
      takeUntil(this.ngUnsubscribe),
      debounceTime(50)
    ).subscribe((event) => {
      this.formValid = event;

      this.createObjData(event);
    });
  }

  /**
   * Method for create object data
   * @returns {void}
   * @memberof FormContactInfoComponent
   */

  private createObjData(data): void {
    const obj = {
      valid: data,
      data: this.dataGroup.value
    };

    if (this.list) {
      obj.data['enableSMS'] = this.list[0].value;
    }

    obj.data['phonePrimary'] = this.dataGroup.get('phonePrimary0').value
      + this.dataGroup.get('phonePrimary1').value + this.dataGroup.get('phonePrimary2').value;
    this.outputActionMethod.emit(obj);
  }

  /**
   * Method for change form
   * @returns {void}
   * @memberof FormContactInfoComponent
   */

  public changeForm(event: any): void {
    this.createObjData(this.formValid);
  }

  /**
   * Method ngAfterViewChecked
   * @returns {void}
   * @memberof FormContactInfoComponent
   */

  public ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }

  /**
   * Method ngOnDestroy
   * @returns {void}
   * @memberof FormContactInfoComponent
   */

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
