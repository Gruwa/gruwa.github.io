import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import {FlowService} from '../shared/services/flow.service';
import {DataService} from '../shared/services/data.service';
import {HttpService} from '../shared/services/http.service';
import {ISettings} from '../shared/interfaces/settings.interface';
import {
  debounceTime,
  takeUntil
} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {LocalStorageService} from 'ngx-webstorage';

/**
 * Settings Component
 */

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {

  /**
   * Variable headerDescription
   * @type {string}
   * @memberof SettingsComponent
   */

  public headerDescription: string = 'Settings';

  /**
   * Variable lists
   * @type {any}
   * @memberof SettingsComponent
   */

  public lists;

  /**
   * Variable of spinner
   * @type {boolean}
   * @memberof SettingsComponent
   */

  public spinner: boolean = false;

  /**
   * Variable of ngUnsubscribe
   * @type {Subject<void>}
   * @memberof SettingsComponent
   */

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  /**
   * Creates an instance of SettingsComponent
   * @param {HttpService} httpService
   * @param {FlowService} flowService
   * @param {ToastrService} toastr
   * @param {DataService} dataService
   * @param {LocalStorageService} localStorage
   * @memberof SettingsComponent
   */

  constructor(private flowService: FlowService,
              public dataService: DataService,
              public httpService: HttpService,
              private toastr: ToastrService,
              private localStorage: LocalStorageService) {
  }

  /**
   * Method ngOnInit
   * @returns {void}
   * @memberof SettingsComponent
   */

  public ngOnInit(): void {
    this.flowService.dataSmallSpinner$.pipe(
        takeUntil(this.ngUnsubscribe),
        debounceTime(500)
      ).subscribe((value) => {
      this.spinner = value;
    });
    this.flowService.dataSmallSpinner$.next(true);

    if (!this.flowService.dataSettings$) {
      this.httpService.getSettings();
    }

    this.flowService.dataSettings$.pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe((value: Array<ISettings>) => {
      this.lists = value;
      this.flowService.dataSmallSpinner$.next(false);
    });
  }

  /**
   * Method fo show side bar
   * @returns {void}
   * @param {any} event
   * @memberof SettingsComponent
   */

  public showSideBar(event?: any): void {
    this.flowService.dataSideBar$.next(true);
  }

  /**
   * Method fo show spinner
   * @returns {void}
   * @param {any} event
   * @memberof SettingsComponent
   */

  public changeToggle(event?: any): void {
    this.httpService.patchSettings(event).pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe((resp) => {
      this.toastr.success(this.dataService.httpSuccessResponse['save']);
      this.flowService.dataSettings$.pipe(
        takeUntil(this.ngUnsubscribe)
      ).subscribe((data) => {
        for (const key in data) {
          if (data[key].id === resp[0].id) {
            data[key] = resp[0];
          }
        }
      });
    });
  }

  /**
   * Method ngOnDestroy
   * @returns {void}
   * @memberof SettingsComponent
   */

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
