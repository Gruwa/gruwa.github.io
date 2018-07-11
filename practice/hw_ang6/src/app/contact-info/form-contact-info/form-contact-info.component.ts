import {Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {DataService} from '../../shared/services/data.service';
import {HttpService} from '../../shared/services/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {LocalStorageService} from 'ngx-webstorage';
import {HttpGuardService} from '../../shared/services/http-guard.service';
import {FlowService} from '../../shared/services/flow.service';

@Component({
  selector: 'app-form-contact-info',
  templateUrl: './form-contact-info.component.html',
  styleUrls: ['./form-contact-info.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormContactInfoComponent implements OnInit, OnChanges {

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
    this.descriptions = this.dataService.LIST_FIELDS_FORM_INFO;

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
      email: ['', []],
      phonePrimary: ['', []],
      enableSMS: ['', []],
      cellProvider: ['', []],
      address1: ['', []],
      address2: ['', []],
      city: ['', []],
      state: ['', []],
      zip: ['', []]
    });

    // this.dataGroup.statusChanges.pipe(
    //   takeUntil(this.ngUnsubscribe)
    // ).subscribe(val => {
    //   // this.changeForm(val);
    // });
    // this.setDataForm();
  }

  /**
   * Method for set data in form
   * @returns {void}
   * @memberof FormComponent
   */

  private setDataForm(): void {
    if (this.data) {
      if (this.data['contactInfo']) {
        for (let i = 0; i < this.dataService.LIST_FIELDS_KEY_FORM_INFO.length; i++) {
          for (let k = 0; k < this.data['contactInfo'].length; k++) {
            if (this.data['contactInfo'][k].id === this.dataService.LIST_FIELDS_KEY_FORM_INFO[i]) {
              this.dataGroup.get(this.dataService.LIST_FIELDS_KEY_FORM_INFO[i]).setValue(this.data['contactInfo'][k].value);
            }
          }
        }
      }
    }
  }

  public changeForm(event: any): void {
    this.outputActionMethod.emit(event);
  }

}
