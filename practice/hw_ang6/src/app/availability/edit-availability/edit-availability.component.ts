import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {ITabTypesAvailability} from '../../shared/interfaces/types.interface';
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
import {HttpGuardService} from '../../shared/services/http-guard.service';

@Component({
  selector: 'app-edit-availability',
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

  public descriptionRightActive: 'VALID' | 'INVALID' = 'VALID';

  /**
   * Variable availabilityActive
   * @type {object}
   * @memberof EditAvailabilityComponent
   */

  public availabilityActive;

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
              private availabilityService: AvailabilityService,
              private httpGuardService: HttpGuardService) {
  }

  /**
   * Method ngOnInit
   * @returns {void}
   * @memberof EditAvailabilityComponent
   */

  public ngOnInit(): void {
    this.descriptionLeft = this.localStorage.retrieve('tabavailability');
    this.formDescriptions = this.dataService.LIST_DESCRIPTIONS;

    for (const i in this.dataService.FLOW_AVAILABILITY) {
      if (!this.flowService[`${this.dataService.FLOW_AVAILABILITY[i]}`]) {
        this.httpService.getAvailability(<ITabTypesAvailability>i);

        if (this.router.url === '/availability/new') {
          this.router.navigate(['/availability']);
        }
      }
    }

    this.flowService[`${this.dataService.FLOW_AVAILABILITY[this.localStorage.retrieve('tabavailability')]}`].pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe(
      (items) => {
        if (this.route.snapshot.params['id'] !== 'new') {
          this.availabilityActive = this.availabilityService.getAvailabilityActive(items, this.route.snapshot.params['id']);
          this.availabilityActive = {
            availabilityActive: this.availabilityService.getAvailabilityActive(items, this.route.snapshot.params['id']),
            frequencyList: items['frequencyList']
          };
        } else {
          this.availabilityActive = {
            frequencyList: items['frequencyList']
          };
        }
      });
  }

  /**
   * Method fo show spinner
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
            this.flowService[`${this.dataService.FLOW_AVAILABILITY[this.localStorage.retrieve('tabavailability')]}`].pipe(
              takeUntil(this.ngUnsubscribe)
            ).subscribe(
              (data) => {
                for (const key in data['items']) {
                  if (data['items'][key].id === this.route.snapshot.params['id']) {
                    data['items'].splice(key, 1);
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
      this.toastr.error(this.dataService.errorResponse['emptyRequired']);
      console.log('You have empty required fields');
    }
  }

  /**
   * Method fo change form
   * @returns {void}
   * @param {any} event
   * @memberof EditAvailabilityComponent
   */

  public changeForm(event: any): void {
    this.descriptionRightActive = event;
    this.iconRight = undefined;
    this.descriptionRight = 'save';
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
