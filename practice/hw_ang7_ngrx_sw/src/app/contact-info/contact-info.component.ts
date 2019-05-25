import {
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {FlowService} from '../shared/services/flow.service';
import {DataService} from '../shared/services/data.service';
import {HttpService} from '../shared/services/http.service';
import {
  debounceTime,
  takeUntil
} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {ContactInfoService} from './services/contact-info.service';
import {LocalStorageService} from '../../../node_modules/ngx-webstorage';

/**
 * Settings Component
 */

@Component({
  selector: 'sw-app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ContactInfoComponent implements OnInit, OnDestroy {

  /**
   * Variable of spinner
   * @type {string}
   * @memberof ContactInfoComponent
   */

  public iconLeft: string = 'menu';

  /**
   * Variable headerDescription
   * @type {string}
   * @memberof ContactInfoComponent
   */

  public descriptionLeft: string = 'contact information';

  /**
   * Variable headerDescriptionRight
   * @type {string}
   * @memberof ContactInfoComponent
   */

  public descriptionRight: string = 'save';

  /**
   * Variable descriptionRightActive
   * @type {string}
   * @memberof EditAvailabilityComponent
   */

  public descriptionRightActive: 'VALID' | 'INVALID' = 'VALID';

  /**
   * Variable list
   * @type {object}
   * @memberof ContactInfoComponent
   */

  public list: object;

  /**
   * Variable formData
   * @type {any}
   * @memberof ContactInfoComponent
   */

  public formData;

  /**
   * Variable of spinner
   * @type {boolean}
   * @memberof ContactInfoComponent
   */

  public spinner: boolean = false;

  /**
   * Variable of ngUnsubscribe
   * @type {Subject<void>}
   * @memberof ContactInfoComponent
   */

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  /**
   * Creates an instance of ContactInfoComponent
   * @param {HttpService} httpService
   * @param {FlowService} flowService
   * @param {ToastrService} toastr
   * @param {DataService} dataService
   * @param {LocalStorageService} localStorage
   * @param {ContactInfoService} contactInfoService
   * @memberof ContactInfoComponent
   */

  constructor(public flowService: FlowService,
              public dataService: DataService,
              public httpService: HttpService,
              private toastr: ToastrService,
              private localStorage: LocalStorageService,
              private contactInfoService: ContactInfoService) {
  }

  /**
   * Method ngOnInit
   * @returns {void}
   * @memberof ContactInfoComponent
   */

  public ngOnInit(): void {
    this.flowService.dataSmallSpinner$.pipe(
      takeUntil(this.ngUnsubscribe),
      debounceTime(3)
    ).subscribe((value) => {
      this.spinner = value;
    });
    this.flowService.dataSmallSpinner$.next(true);
    this.flowService.dataContactInfo$.pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe(() => {
      this.flowService.dataSmallSpinner$.next(false);
    });

    if (!this.localStorage.retrieve('group') ||
      this.httpService.contactInfo !== this.localStorage.retrieve('group').activeId ||
      this.flowService.dataContactInfoSwitch$.getValue() === 'pause') {
      this.flowService.dataContactInfoSwitch$.next('');
    }
  }

  /**
   * Method fo show side bar
   * @returns {void}
   * @param {any} event
   * @memberof ContactInfoComponent
   */

  public showSideBar(event?: any): void {
    if (event === 'iconLeft') {
      this.flowService.dataSideBar$.next('iconLeft');
    } else if (event === 'descriptionRight') {
      this.httpService.patchContactInfo(this.formData, this.flowService.dataContactInfo$.getValue()).pipe(
        takeUntil(this.ngUnsubscribe)
      ).subscribe(resp => {
          this.toastr.success(this.dataService.httpSuccessResponse['save']);
          this.flowService.dataContactInfo$.pipe(
            takeUntil(this.ngUnsubscribe)
          ).subscribe((data) => {
            data['contactInfo'] = resp['contactInfo'];
          });
        }
      );
    } else if (event === 'descriptionRightDeactivate') {
      this.toastr.error(this.dataService.errorResponse['emptyRequired']);
    }
  }

  /**
   * Method fo change form
   * @returns {void}
   * @param {any} event
   * @memberof ContactInfoComponent
   */

  public changeForm(event: any): void {
    this.descriptionRightActive = event['valid'];
    this.formData = event['data'];
  }

  /**
   * Method ngOnDestroy
   * @returns {void}
   * @memberof ContactInfoComponent
   */

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
