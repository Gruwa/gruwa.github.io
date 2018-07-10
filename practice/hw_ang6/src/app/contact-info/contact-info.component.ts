import {
  Component,
  OnDestroy,
  OnInit
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

/**
 * Settings Component
 */

@Component({
  selector: 'app-settings',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.scss']
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
   * Variable lists
   * @type {any}
   * @memberof ContactInfoComponent
   */

  public lists: object;

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
   * @memberof ContactInfoComponent
   */

  constructor(private flowService: FlowService,
              public dataService: DataService,
              public httpService: HttpService,
              private toastr: ToastrService) {
  }

  /**
   * Method ngOnInit
   * @returns {void}
   * @memberof ContactInfoComponent
   */

  public ngOnInit(): void {
    this.flowService.dataSmallSpinner$.pipe(
      takeUntil(this.ngUnsubscribe),
      debounceTime(500)
    ).subscribe((value) => {
      this.spinner = value;
    });
    this.flowService.dataSmallSpinner$.next(true);

    if (!this.flowService.dataContactInfo$) {
      this.httpService.getContactInfo();
    }

    this.flowService.dataContactInfo$.pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe((value: object) => {
      console.log(value);
      this.lists = value;
      this.flowService.dataSmallSpinner$.next(false);
    });

    // this.flowService.dataSettings$.pipe(
    //   takeUntil(this.ngUnsubscribe)
    // ).subscribe((value: Array<ISettings>) => {
    //   this.lists = value;
    //   this.flowService.dataSmallSpinner$.next(false);
    // });
  }

  /**
   * Method fo show side bar
   * @returns {void}
   * @param {any} event
   * @memberof ContactInfoComponent
   */

  public showSideBar(event?: any): void {
    this.flowService.dataSideBar$.next('iconLeft');
  }

  /**
   * Method fo show spinner
   * @returns {void}
   * @param {any} event
   * @memberof ContactInfoComponent
   */

  public changeToggle(event?: any): void {
    // this.httpService.patchSettings(event.id, event.action).subscribe((resp) => {
    //   this.toastr.success(this.dataService.httpSuccessResponse['save']);
    //   this.flowService.dataSettings$.subscribe((data) => {
    //     for (const key in data) {
    //       if (data[key].id === resp[0].id) {
    //         data[key] = resp[0];
    //       }
    //     }
    //   });
    // });
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
