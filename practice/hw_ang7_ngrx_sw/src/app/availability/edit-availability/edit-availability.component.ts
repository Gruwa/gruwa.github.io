import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {DataService} from '../../shared/services/data.service';
import {FlowService} from '../../shared/services/flow.service';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {LocalStorageService} from 'ngx-webstorage';
import {Subject} from 'rxjs';
import {HttpService} from '../../shared/services/http.service';
import {AvailabilityService} from '../services/availability.service';
import {ToastrService} from 'ngx-toastr';
import {Async} from '../../shared/models/decorators';

@Component({
  selector: 'sw-app-edit-availability',
  templateUrl: './edit-availability.component.html',
  styleUrls: ['./edit-availability.component.scss']
})
export class EditAvailabilityComponent implements OnInit, OnDestroy {

  /**
   * Variable formDescription
   * @type {IShift}
   * @memberof EditAvailabilityComponent
   */

  public formDescriptions;

  /**
   * Variable eventForm
   * @type {boolean}
   * @memberof EditAvailabilityComponent
   */

  private eventForm: boolean = false;

  /**
   * Variable of iconLeft
   * @type {string}
   * @memberof EditAvailabilityComponent
   */

  public iconLeft: string = 'close';

  /**
   * Variable of iconRight
   * @type {string}
   * @memberof EditAvailabilityComponent
   */

  public iconRight: 'delete' | 'save' = 'delete';

  /**
   * Variable descriptionLeft
   * @type {string}
   * @memberof EditAvailabilityComponent
   */

  public descriptionLeft: 'time off' | 'volunteer' = 'time off';

  /**
   * Variable descriptionRight
   * @type {string}
   * @memberof EditAvailabilityComponent
   */

  public descriptionRight: string;

  /**
   * Variable descriptionRightActive
   * @type {string}
   * @memberof EditAvailabilityComponent
   */

  public descriptionRightActive: 'VALID' | 'INVALID' | 'DISABLED' = 'VALID';

  /**
   * Local Async availabilityActive
   * @type {object}
   * @memberof EditAvailabilityComponent
   */

  @Async() availabilityActive$;

  /**
   * Variable of ngUnsubscribe
   * @type {Subject<void>}
   * @memberof EditAvailabilityComponent
   */

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  /**
   * Creates an instance of EditAvailabilityComponent
   * @param {Router} router
   * @param {ActivatedRoute} route
   * @param {LocalStorageService} localStorage
   * @param {DataService} dataService
   * @param {FlowService} flowService
   * @param {HttpService} httpService
   * @param {AvailabilityService} availabilityService
   * @param {ToastrService} toastr
   * @Param {Router} router
   * @memberof EditAvailabilityComponent
   */

  constructor(private dataService: DataService,
              private router: Router,
              private route: ActivatedRoute,
              private localStorage: LocalStorageService,
              private flowService: FlowService,
              private httpService: HttpService,
              private toastr: ToastrService,
              private availabilityService: AvailabilityService) {
  }

  /**
   * Method ngOnInit
   * @returns {void}
   * @memberof EditAvailabilityComponent
   */

  public ngOnInit(): void {
    this.descriptionLeft = this.localStorage.retrieve(this.dataService.LOCAL_STORAGE['tabavailability']);
    this.formDescriptions = this.dataService.LIST_DESCRIPTIONS_FORM_AVAILABILITY;

    this.flowService.dataAvailability$.pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe(data => {
        if (data) {
          const id = this.route.snapshot.params['id'];

          const _activeAv = this.availabilityService.getActiveAvailability(data, id);

          if (_activeAv['availabilityActive'] === 'not found') {
            this.router.navigate(['/404']);
          } else {
            this.availabilityActive$.next(_activeAv);
          }

          this.flowService.activeItem$.next('my availability');
        }
      }
    );

    if (!this.localStorage.retrieve('group') ||
      this.httpService.availability !== this.localStorage.retrieve('group').activeId ||
      this.flowService.dataAvailabilitySwitch$.getValue() === 'pause') {
      this.flowService.dataAvailabilitySwitch$.next('');
    }
  }

  /**
   * Method for show SideBar
   * @returns {void}
   * @param {any} event
   * @memberof EditAvailabilityComponent
   */

  public showSideBar(event?: any): void {
    if (event === 'iconLeft') {
      this.router.navigate(['/availability']);
    }
    if (event === 'iconRight') {
      if (this.router.url === '/availability/new') {
        this.router.navigate(['/availability']);
      } else {
        this.httpService.deleteAvailability(this.route.snapshot.params['id']).subscribe((resp) => {
          if (resp['Data'].Success) {
            this.toastr.success(this.dataService.httpSuccessResponse['delete']);
            this.flowService[`${this.dataService.FLOW_AVAILABILITY[
              this.localStorage.retrieve(this.dataService.LOCAL_STORAGE['tabavailability'])]}`].pipe(
              takeUntil(this.ngUnsubscribe)
            ).subscribe(
              (data) => {
                for (const key in data[this.localStorage.retrieve(this.dataService.LOCAL_STORAGE['tabavailability'])]) {
                  if (data[this.localStorage.retrieve(this.dataService.LOCAL_STORAGE['tabavailability'])][key].id ===
                    this.route.snapshot.params['id']) {
                    data[this.localStorage.retrieve(this.dataService.LOCAL_STORAGE['tabavailability'])].splice(key, 1);
                    this.router.navigate(['/availability']);
                  }
                }
              });
          }
        });
      }
    }
    if (event === 'descriptionRight') {
      this.flowService.dataEventTimeOff$.next('save');
    }
    if (event === 'descriptionRightDeactivate') {
      this.flowService.dataEventTimeOff$.next('required');
      this.toastr.error(this.dataService.errorResponse['emptyRequired']);
    }
  }

  /**
   * Method fo change form
   * @returns {void}
   * @param {any} event
   * @memberof EditAvailabilityComponent
   */

  public changeForm(event: any): void {

    if (this.eventForm) {
      this.descriptionRightActive = event;

      if (event.source && event.source.controlType === 'mat-select') {
        this.descriptionRightActive = 'VALID';
      }

      this.iconRight = undefined;
      this.descriptionRight = 'save';

    }

    this.eventForm = true;

    if (event === 'DISABLED') {
      this.descriptionRight = undefined;
    }
  }

  /**
   * Method ngOnDestroy
   * @returns {void}
   * @memberof EditAvailabilityComponent
   */

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
