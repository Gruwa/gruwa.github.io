import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { LocalStorageService } from '@services/local-storage.service';
import * as moment from 'moment';
import { Async } from '@models/decorators';
import { GuardPayMemosService } from './guard-pay-memos.service';
import { debounceTime, filter, map, shareReplay, switchMap, takeUntil, tap } from 'rxjs/operators';
import { LookupItemDate } from '@app/activities/purchase/invoices/invoice.models';
import { PopupMessageService } from '@components/popup-message';
import { PayrollAPIService } from '@services/api/payroll';
import { ActivatedRoute } from '@angular/router';
import { Fields } from '@app/activities/pay-memos/interfaces/pay-memo.interface';

@Injectable()
export class PayMemosService implements OnDestroy {
	public dataPayMemoMemos$;

	public dataPayMemo$: BehaviorSubject<any> = new BehaviorSubject(undefined);

	public changeDateFrom$: BehaviorSubject<any> = new BehaviorSubject(undefined);

	public changeDateThrough$: BehaviorSubject<any> = new BehaviorSubject(undefined);

	public fromDateNew$: BehaviorSubject<any> = new BehaviorSubject(undefined);

	public thruDateNew$: BehaviorSubject<any> = new BehaviorSubject(undefined);

	public storeEmployeeIDNew$: BehaviorSubject<any> = new BehaviorSubject(undefined);

	public activePeriod$: BehaviorSubject<any> = new BehaviorSubject(undefined);

	public busy$: BehaviorSubject<boolean> = new BehaviorSubject(undefined);

	public payMemosActiveListSwitch$: BehaviorSubject<any> = new BehaviorSubject(undefined);

	public dataSavedResult$: BehaviorSubject<any> = new BehaviorSubject(undefined);

	public payMemosMainList$: BehaviorSubject<object> = new BehaviorSubject(undefined);

	public payMemosSwitch$: BehaviorSubject<any> = new BehaviorSubject(undefined);

	public payrollSwitch$: BehaviorSubject<any> = new BehaviorSubject(undefined);

	public fromDate$: BehaviorSubject<any> = new BehaviorSubject(
		this.getDate(moment().add(-1, 'days'))
	);

	public pageTitlePayMemos$: BehaviorSubject<any> = new BehaviorSubject(undefined);

	public periodPayMemos$: BehaviorSubject<any[]> = new BehaviorSubject(null);

	public generalFieldDisabled$: BehaviorSubject<Boolean> = new BehaviorSubject(undefined);

	public editHoursDisabled$: BehaviorSubject<Boolean> = new BehaviorSubject(undefined);

	public mandatoryAmountDisabled$: BehaviorSubject<Boolean> = new BehaviorSubject(undefined);

	public activeMemo$: BehaviorSubject<any> = new BehaviorSubject(undefined);

	public showListPayMemosSwitch$: BehaviorSubject<any> = new BehaviorSubject(undefined);

	public payMemosActiveList$: BehaviorSubject<any> = new BehaviorSubject(undefined);

	public thruDate$: BehaviorSubject<any> = new BehaviorSubject(
		this.getDate(moment())
	);

	public storeEmployeeID$ = new BehaviorSubject(
		this.guardPayMemosService.respEmployeeGuardData([{
			StoreEmployeeID: '',
			FirstName: '',
			LastName: '',
		}])[0]
	);

	public dataPayMemosEmployees$;

	public dataEmployeePayMemoJobs$;

	public cardsFlow$ = new BehaviorSubject(undefined);

	public refreshData: number = 600000;

	private _activeList;

	private _mainList;

	private ngUnsubscribe: Subject<void> = new Subject<void>();

	@Async() storePayMemos$;

	@Async() clickOnList: BehaviorSubject<string>;

	constructor(
		private localStorageService: LocalStorageService,
		private guardPayMemosService: GuardPayMemosService,
		private popup: PopupMessageService,
		private payrollAPIService: PayrollAPIService,
		private route: ActivatedRoute,
	) {
		this.staticData();
		this.activateData();
	}

	ngOnDestroy(): void {
		this.ngUnsubscribe.next();
		this.ngUnsubscribe.complete();
	}

	public editObjectPayMemoForSave(item: any): boolean {
		for (const i in item) {
			if (i === 'originalAmount' && !item[i]) {
				item[i] = null;
			}
			if (item[i] !== 0 && (!item[i] || item[i] === '')) {
				console.error('er');
				this.popup.message$ = 'Missing required field ' + i;

				return false;
			}
		}

		return true;
	}

	public compareDate(date: string): boolean {
		return moment().isBefore(moment(date).add(this.refreshData, 'milliseconds'));
	}

	public activateData(): void {
		this.dataPayMemosEmployees$ = this.payrollAPIService.getPayrollEmployeesEP
			.set({
				showValidJobsOnly: true,
			})
			.get()
			.pipe(
				map((value) => {
					return this.guardPayMemosService.respEmployeeGuardData(value);
				})
			);

		this.dataPayMemoMemos$ = this.payrollAPIService.getPayrollMemosPayMemoEP
			.get()
			.pipe(
				map(value => this.guardPayMemosService.respMemoGuardData(value)),
			);
	}

	private getPeriodPayMemo(start: string | Date, end: string | Date, allow: boolean = true): any {
		const arrayBusinessDatePayMemos = [];

		arrayBusinessDatePayMemos.push(this.getDate(start));

		for (
			let i = moment(start).add(1, 'days');
			moment(i).isBetween(start, end);
			i = moment(i).add(1, 'days')
		) {
			arrayBusinessDatePayMemos.push(this.getDate(i));
		}

		if (allow) {
			arrayBusinessDatePayMemos.push(this.getDate(end));
		}

		return arrayBusinessDatePayMemos;
	}

	private getDate(value?: any): LookupItemDate {
		return new LookupItemDate({
			id: moment(value).format('YYYY-MM-DD') + 'T00:00:00.000Z',
			description: moment(value).format('MM/DD/YYYY'),
			sortOrder: 0,
		});
	}

	private staticData() {
		this.payMemosActiveList$
			.pipe(
				takeUntil(this.ngUnsubscribe),
				filter(v => !!v)
			)
			.subscribe(v => {
				this._activeList = v;
			});

		this.payMemosMainList$
			.pipe(
				takeUntil(this.ngUnsubscribe),
				filter(v => !!v),
			)
			.subscribe(v => {
				this._mainList = v;
			});

		this.getAPIPeriod();

		this.localStorageService.flows.payMemosFromDateStorage$
			.pipe(
				takeUntil(this.ngUnsubscribe),
				filter(value => value)
			)
			.subscribe(value => {
				this.fromDate$.next(this.getDate(moment(value).utc()));
			});

		this.localStorageService.flows.payMemosThruDateStorage$
			.pipe(
				takeUntil(this.ngUnsubscribe),
				filter(value => value)
			)
			.subscribe(value => {
				this.thruDate$.next(this.getDate(moment(value).utc()));
			});

		this.payrollAPIService.cards$
			.pipe(
				takeUntil(this.ngUnsubscribe),
				filter(value => !!value),
			)
			.subscribe((v) => this.cardsFlow$.next(v));

		this.activeMemo$
			.pipe(
				takeUntil(this.ngUnsubscribe),
				filter(value => value)
			)
			.subscribe((value) => {
				this.payrollAPIService.payrollMemoJobsEP(value);
				this.dataEmployeePayMemoJobs$ = this.payrollAPIService.getPayrollMemoJobsEP
					.get()
					.pipe(
						map(v => this.guardPayMemosService.respJobsGuardData(v)),
					);
			});

		if (!this.localStorageService.getItem('payMemosStoreEmployeeIDStorage$')) {
			this.localStorageService.setItem('payMemosStoreEmployeeIDStorage$', '');
		} else {
			this.dataPayMemosEmployees$
				.pipe(
					takeUntil(this.ngUnsubscribe),
				)
				.subscribe(employeeList => {
					const employee =
						employeeList.find(value => value.id === this.localStorageService.getItem('payMemosStoreEmployeeIDStorage$'));
					this.storeEmployeeID$.next(employee);
				});
		}

		this.switchFlows();
	}

	private switchFlows(): void {
		this.showListPayMemosSwitch$
			.pipe(
				debounceTime(500),
				switchMap((v) => {
					this.busy$.next(true);

					return of(v === Fields.main ? this._mainList : this._activeList);
				}),
				filter(v => !!v),
				tap((value) => {
					this.busy$.next(false);
					this.payMemosActiveList$.next(this.filterActiveListPayMemo(value));
				}),
				shareReplay(1),
				takeUntil(this.ngUnsubscribe)
			)
			.subscribe();

		this.payMemosActiveListSwitch$
			.pipe(
				filter(v => !!v),
				switchMap((value) => {

					return of(this.switchPayMemos(value));
				}),
				tap(() => {
					this.showListPayMemosSwitch$.next(Fields.main);
				}),
				shareReplay(1),
				takeUntil(this.ngUnsubscribe)
			)
			.subscribe(v => {
				this.payMemosActiveList$.next(v);
			});
	}

	private switchPayMemos(value: any) {
		if (typeof value === 'string') {
			this._mainList.forEach((item) => {
				if (item.payMemoID === value) {
					this._mainList.splice(this._mainList.indexOf(item), 1);
				}
			});
		} else {
			const result = this.guardPayMemosService.respGuardPayMemos(value);

			for (let i = 0; i < result.length; i++) {
				if (this._mainList.find(item => item.payMemoID === result[i]['payMemoID'])) {
					this._mainList.forEach((item) => {
						if (item.payMemoID === result[i]['payMemoID']) {
							this._mainList[this._mainList.indexOf(item)] = result[i];
						}
					});
				} else {
					this._mainList.push(result[i]);
				}
			}
		}
		return this._mainList;
	}

	private getAPIPeriod(): void {
		this.payrollSwitch$
			.pipe(
				switchMap(() => {
					return this.payrollAPIService.getPayrollPeriodEP
						.get()
						.pipe(
							takeUntil(this.ngUnsubscribe),
							map(value => {
								return this.guardPayMemosService.respGuardPeriodPayMemos(value[0]);
							}),
						);
				}),
			)
			.subscribe(value => {
				this.periodPayMemos$.next(this.getPeriodPayMemo(
					value['availablePeriodStart'],
					value['availablePeriodEnd'],
					value['allowEditTodaysData']));
				this.activePeriod$.next(value);

				if (localStorage.getItem('activeUser') !== localStorage.getItem('currentUser')) {
					localStorage.setItem('activeUser', localStorage.getItem('currentUser'));
					this.localStorageService.setItem('payMemosFromDateStorage$', !value['AllowEditTodaysData'] ?
						this.getDate(moment().utc().add(-2, 'days'))['id'] :
						this.getDate(moment().utc().add(-1, 'days'))['id']);
					this.localStorageService.setItem('payMemosThruDateStorage$', !value['AllowEditTodaysData'] ?
						this.getDate(moment().utc().add(-1, 'days'))['id'] :
						this.getDate(moment().utc())['id']);
				}

				if (!value['AllowEditTodaysData']) {
					if (!this.localStorageService.getItem('payMemosFromDateStorage$')) {
						this.fromDate$.next(this.getDate(moment(this.fromDate$.getValue()['id']).utc().add(-1, 'days')));
					}
					if (!this.localStorageService.getItem('payMemosThruDateStorage$')) {
						this.thruDate$.next(this.getDate(moment(this.thruDate$.getValue()['id']).utc().add(-1, 'days')));
					}
				}

			});

		this.payMemosSwitch$
			.pipe(
				switchMap(() => {
					this.busy$.next(true);

					return this.payrollAPIService.getPayrollPayMemosEP(
						{
							fromDate: '',
							thruDate: '',
							storeEmployeeID: '',
						}
					);
				}),
				tap((items) => {
					this.payMemosMainList$.next(this.guardPayMemosService.respGuardPayMemos(items));
				}),
				shareReplay(1),
				takeUntil(this.ngUnsubscribe)
			)
			.subscribe(() => {
				this.showListPayMemosSwitch$.next(Fields.main);
				this.localStorageService.setItem('payMemosSleep', '');

				this.refreshDataPayMemo();
			});
	}

	private refreshDataPayMemo(): void {
		const url = this.route.snapshot['_routerState']['url'];

		if (url.match('/activities\/paymemos')) {
			setTimeout(() => {
				this.payMemosSwitch$.next(null);
			}, this.refreshData);
		} else {
			this.localStorageService.setItem('payMemosSleep', Fields.sleep);
		}
	}

	private filterActiveListPayMemo(list: any): any {

		// date;
		const newList = list.filter(item => !moment(item.businessDate.id).isBefore(moment(this.fromDate$.getValue()['id'])) &&
			!moment(item.businessDate.id).isAfter(this.thruDate$.getValue()['id']));

		// employee
		const resultList = newList.filter(item => item.employee['id'] === this.storeEmployeeID$.getValue()['id'] ||
			this.storeEmployeeID$.getValue()['id'] === '');

		return resultList;
	}
}
