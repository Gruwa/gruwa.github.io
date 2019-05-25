import {Injectable, OnDestroy} from '@angular/core';
import {IAvailability} from '../../shared/interfaces/timeoff.interface';
import {LocalStorageService} from 'ngx-webstorage';
import {DataService} from '../../shared/services/data.service';
import {
  combineLatest,
  Subject
} from 'rxjs';
import {FlowService} from '../../shared/services/flow.service';
import {HttpService} from '../../shared/services/http.service';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {filter, takeUntil} from 'rxjs/operators';

/**
 * Availability Service
 */

@Injectable()
export class AvailabilityService implements OnDestroy {

  /**
   * Variable of ngUnsubscribe
   * @type {Subject<void>}
   * @memberof AvailabilityComponent
   */

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  /**
   * Creates an instance of AvailabilityService
   * @param {DataService} dataService
   * @param {LocalStorageService} localStorage
   * @param {FlowService} flowService
   * @param {HttpService} httpService
   * @param {Router} router
   * @param {ActivatedRoute} route
   * @memberof AvailabilityService
   */

  constructor(private localStorage: LocalStorageService,
              private dataService: DataService,
              private flowService: FlowService,
              private httpService: HttpService,
              private router: Router,
              private route: ActivatedRoute) {
    this.getDataAvailability();
  }

  /**
   * Method getAvailabilityActive
   * @returns {void}
   * @memberof AvailabilityService
   */

  public getAvailabilityActive(items: any, id: string): IAvailability {
    if (items) {
      return items.find(item => item.id === id);
    }
  }

  /**
   * Method getDataAvailability
   * @param {any} data
   * @returns {any}
   * @memberof AvailabilityService
   */

  public setDataAvailability(data: any): any {
    const result = [];

    for (let i = 0; i < data.length; i++) {
      for (const k in data[i]) {
        result[k] = [];
        result[k] = data[i][k];
      }
    }
    return result;
  }

  /**
   * Method getDataAvailability
   * @returns {void}
   * @memberof AvailabilityService
   */

  public getDataAvailability(): void {
    this.httpService.getAvailability();

    if (this.router.url === '/availability/new') {
      this.router.navigate(['/availability']);
    }

    combineLatest(this.flowService.dataTimeOff$, this.flowService.dataVolunteer$).pipe(
      takeUntil(this.ngUnsubscribe),
      filter(v => !!v[0] && !!v[1]),
    ).subscribe(value => {
      this.flowService.dataAvailability$.next(this.setDataAvailability(value));
      this.flowService.dataCleanFlow$.next({
        description: 'dataAvailability$'
      });
    });
  }

  /**
   * Method getActiveAvailability
   * @returns {void}
   * @memberof AvailabilityService
   */

  public getActiveAvailability(data: object, id: string) {
    if (id !== 'new') {
      const _activeID = this.getAvailabilityActive(
        data[this.localStorage.retrieve(this.dataService.LOCAL_STORAGE['tabavailability'])],
        id);
      if (_activeID) {
        return {
          availabilityActive: _activeID,
          frequencyList: data['frequencyList']
        };
      } else {
        return {
          availabilityActive: 'not found',
          frequencyList: data['frequencyList']
        };
      }

    } else {
      return {
        frequencyList: data['frequencyList']
      };
    }
  }

  /**
   * Method saveActiveAvailability
   * save active Availability
   * @returns {void}
   * @memberof AvailabilityService
   */

  public saveActiveAvailability(data: object, id: string, url: string) {
    const availability = this.flowService.dataAvailability$.getValue();

    if (url !== '/availability/new') {
      const availabilityId = availability[this.localStorage.retrieve(this.dataService.LOCAL_STORAGE['tabavailability'])]
        .findIndex(item => item.id === id);

      availability[this.localStorage.retrieve(this.dataService.LOCAL_STORAGE['tabavailability'])][availabilityId] = data;
    } else {
      availability[this.localStorage.retrieve(this.dataService.LOCAL_STORAGE['tabavailability'])].push(data);
    }

    return availability;
  }

  /**
   * Method ngOnDestroy
   * @returns {void}
   * @memberof AvailabilityComponent
   */

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
