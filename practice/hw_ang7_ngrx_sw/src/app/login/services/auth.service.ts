import {
  Injectable,
  OnDestroy
} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {
  ITabTypesShifts
} from '../../shared/interfaces/types.interface';
import {FlowService} from '../../shared/services/flow.service';
import {DataService} from '../../shared/services/data.service';
import {
  Subject
} from 'rxjs';
import {HttpService} from '../../shared/services/http.service';
import {ToastrService} from 'ngx-toastr';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {LocalStorageService} from 'ngx-webstorage';
import {HttpGuardRequestService} from '../../shared/services/http-guard-request.service';
import {IGroupRestaurant} from '../../shared/interfaces/group-restaurant.interface';
import {takeUntil} from 'rxjs/operators';
import {HttpGuardService} from '../../shared/services/http-guard.service';

/**
 * Auth Service
 */

@Injectable()
export class AuthService implements OnDestroy {

  /**
   * Variable of tab
   * @type {ITabTypesShifts}
   * @memberof AuthService
   */

  public tab: ITabTypesShifts = 'upcoming';

  /**
   * Variable of ngUnsubscribe
   * @type {Subject<void>}
   * @memberof AuthService
   */

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  /**
   * Creates an instance of AuthService
   * @param {HttpClient} http
   * @param {FlowService} flowService
   * @param {DataService} dataService
   * @param {ToastrService} toastr
   * @param {HttpService} httpService
   * @param {LocalStorageService} localStorage
   * @param {HttpGuardRequestService} httpGuardRequestService
   * @param {Router} router
   * @param {ActivatedRoute} activeRoute
   * @param {HttpGuardService} httpGuardService
   * @memberof AuthService
   */

  constructor(private http: HttpClient,
              private flowService: FlowService,
              private dataService: DataService,
              private toastr: ToastrService,
              private httpService: HttpService,
              private router: Router,
              private localStorage: LocalStorageService,
              private httpGuardRequestService: HttpGuardRequestService,
              private activeRoute: ActivatedRoute,
              private httpGuardService: HttpGuardService) {
  }

  /**
   * Method for put shifts in flow
   * @param {object} body
   * @param {string} redirecturl
   * @returns {void}
   * @memberof AuthService
   */

  public onLogin(body: object, redirecturl?: string): void {
    console.log(body);
    this.httpService.onLoginRequest(this.httpGuardRequestService.guardlogin(body)).pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe((value) => {
      setTimeout(() => {
        this.flowService.buttonAuth$.next(false);
      }, 5000);

      const res = this.httpGuardService.guardRestaurants(value);

      this.flowService.dataRestaurants$.next(res);

      if (this.localStorage.retrieve('user') === body['login']) {
        if (res.length === 1) {
          if (!redirecturl || redirecturl === '/login/schedule') {
            this.getShifts(res[0]);
          } else {
            this.router.navigate([redirecturl]);
          }
        } else {
          this.flowService.dataSmallSpinner$.next(true);
          this.router.navigate(['/login/schedule']);
        }
      } else {
        this.localStorage.clear('tab');
        this.localStorage.clear('group');
        this.localStorage.clear('tabavailability');
        this.flowService.activeItem$.next('shifts');
        this.localStorage.store('user', body['login']);
        this.localStorage.store('GroupRestaurants', res);
        if (res.length === 1) {
          this.getShifts(res[0]);
        } else {
          this.flowService.dataSmallSpinner$.next(true);
          this.router.navigate(['/login/schedule']);
        }
      }
    });
  }

  /**
   * Method for getShifts
   * @returns {void}
   * @memberof AuthService
   */

  public getShifts(group?: IGroupRestaurant): void {
    this.router.navigate(['/shifts']);
    group['activeId'] = group.id + '_' + this.localStorage.retrieve('user');
    this.localStorage.store('group', group);

    for (const i in this.dataService.FLOW) {
      if (this.dataService.FLOW) {
        this.flowService[`${this.dataService.FLOW[i]}`] = undefined;
        this.httpService.getShifts(<ITabTypesShifts>i);
      }
    }

    this.flowService.dataSmallSpinner$.next(false);
  }

  /**
   * Method ngOnDestroy
   * @returns {void}
   * @memberof AuthService
   */

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
