//import {
//  Injectable,
//  OnDestroy
//} from '@angular/core';
//import {HttpClient} from '@angular/common/http';
//import {
//  ITabTypesShifts
//} from '../../shared/interfaces/types.interface';
//import {FlowService} from '../../shared/services/flow.service';
//import {DataService} from '../../shared/services/data.service';
//import {
//  Observable,
//  Subject
//} from 'rxjs';
//import {HttpService} from '../../shared/services/http.service';
//import {ToastrService} from 'ngx-toastr';
//import {
//  ActivatedRoute,
//  Router
//} from '@angular/router';
//import {LocalStorageService} from 'ngx-webstorage';
//import {HttpGuardRequestService} from '../../shared/services/http-guard-request.service';
//import {IGroupRestaurant} from '../../shared/interfaces/group-restaurant.interface';
//import {takeUntil} from 'rxjs/operators';

///**
// * Auth Service
// */

//@Injectable()
//export class AuthService implements OnDestroy {

//  /**
//   * Variable of tab
//   * @type {ITabTypesShifts}
//   * @memberof AuthService
//   */

//  public tab: ITabTypesShifts = 'upcoming';

//  /**
//   * Variable of ngUnsubscribe
//   * @type {Subject<void>}
//   * @memberof AuthService
//   */

//  private ngUnsubscribe: Subject<void> = new Subject<void>();

//  /**
//   * Creates an instance of AuthService
//   * @param {HttpClient} http
//   * @param {FlowService} flowService
//   * @param {DataService} dataService
//   * @param {ToastrService} toastr
//   * @param {HttpService} httpService
//   * @param {LocalStorageService} localStorage
//   * @param {HttpGuardRequestService} httpGuardRequestService
//   * @param {Router} router
//   * @param {ActivatedRoute} activeRoute
//   * @memberof AuthService
//   */

//  constructor(private http: HttpClient,
//              private flowService: FlowService,
//              private dataService: DataService,
//              private toastr: ToastrService,
//              private httpService: HttpService,
//              private router: Router,
//              private localStorage: LocalStorageService,
//              private httpGuardRequestService: HttpGuardRequestService,
//              private activeRoute: ActivatedRoute) {
//  }

//  /**
//   * Method for put shifts in flow
//   * @param {object} body
//   * @param {string} redirecturl
//   * @returns {void}
//   * @memberof AuthService
//   */

//  public onLogin(body: object, redirecturl?: string): void {
//    this.onLoginRequest(this.httpGuardRequestService.guardlogin(body)).pipe(
//      takeUntil(this.ngUnsubscribe)
//    ).subscribe((resp) => {
//      setTimeout(() => {
//        this.flowService.buttonAuth$.next(false);
//      }, 5000);

//      // this.localStorage.store('user', body['login']);
//      this.httpService.getRestaurants();
//      this.flowService.dataRestaurants$.pipe(
//        takeUntil(this.ngUnsubscribe)
//      ).subscribe((res: Array<IGroupRestaurant>) => {
//        if (res.length === 1) {
//          this.getShifts(res[0]);
//        } else {
//          this.flowService.dataSmallSpinner$.next(true);

//          if (!redirecturl || redirecturl === '/login/schedule') {
//            this.router.navigate(['/login/schedule']);
//          } else {
//            if (this.localStorage.retrieve('user') !== body['login']) {
//              this.router.navigate(['/login/schedule']);
//            } else {
//              this.router.navigate([redirecturl]);
//            }
//          }
//          this.localStorage.store('user', body['login']);
//        }
//      });
//    });
//  }

//  /**
//   * Method for get shifts
//   * @param {object} body
//   * @returns {Observable<object>}
//   * @memberof AuthService
//   */

//  public onLoginRequest(body: object): Observable<object> {
//    return this.http.post(this.dataService.BASEURL + '/login', body);
//  }

//  /**
//   * Method for getShifts
//   * @returns {void}
//   * @memberof AuthService
//   */

//  public getShifts(group?: IGroupRestaurant): void {
//    this.router.navigate(['/', group.id, 'shifts']);
//    this.localStorage.store('group', group);

//    for (const i in this.dataService.FLOW) {
//      this.flowService[`${this.dataService.FLOW[i]}`] = undefined;
//      this.httpService.getShifts(<ITabTypesShifts>i);
//    }

//    this.flowService.dataAvailabilitySwitch$.next('');
//    this.flowService.dataSmallSpinner$.next(false);
//  }

//  /**
//   * Method ngOnDestroy
//   * @returns {void}
//   * @memberof AuthService
//   */

//  public ngOnDestroy(): void {
//    this.ngUnsubscribe.next();
//    this.ngUnsubscribe.complete();
//  }
//}
