import { ChangeDetectionStrategy, Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { PayMemosService } from './services/pay-memos.service';
import { Router } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { GuardPayMemosService } from './services/guard-pay-memos.service';
import { PayrollAPIService } from '@services/api/payroll';
import { LocalStorageService } from '@shared/services';
import { MenuContentService } from '@shared/components';
import { BoundedType } from '@editor/directives/content/editor-group/group-field-time-bounded.directive';
import { Fields } from '@app/activities/pay-memos/interfaces/pay-memo.interface';

@Component({
    selector: 'rmc-pay-memos',
    templateUrl: './pay-memos.component.html',
    styleUrls: ['./pay-memos.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PayMemosComponent implements OnInit, OnDestroy {
    public boundType = BoundedType;

    private ngUnsubscribe: Subject<void> = new Subject<void>();

    @HostBinding('class') class = 'rmdl-editor-layout';

    constructor(
        public payMemosService: PayMemosService,
        private router: Router,
        private guardPayMemosService: GuardPayMemosService,
        private payrollAPIService: PayrollAPIService,
        private localStorageService: LocalStorageService,
        private menu: MenuContentService<PayMemosComponent>,
    ) {
    }

    ngOnInit(): void {
        if (this.localStorageService.getItem('payMemosSleep') === Fields.sleep) {
            this.payMemosService.payMemosSwitch$.next(null);
        }

        if (localStorage.getItem('activeUser') !== localStorage.getItem('currentUser')) {
            this.payMemosService.activateData();
            this.payMemosService.payMemosSwitch$.next(null);
            this.payMemosService.payrollSwitch$.next(null);
        }

        this.menu.menuService.event
            .pipe(
                takeUntil(this.ngUnsubscribe)
            )
            .subscribe(event => {
                if (event && event.action === 1) {
                    this.payMemosService.showListPayMemosSwitch$.next(Fields.main);
                }
            });

        this.payMemosService.pageTitlePayMemos$.next('Edit Pay Memos');

        this.payMemosService.fromDateNew$
            .pipe(
                filter(v => !!v),
                takeUntil(this.ngUnsubscribe)
            )
            .subscribe(value => {
                this.localStorageService.setItem('payMemosFromDateStorage$', value['id']);
            });

        this.payMemosService.thruDateNew$
            .pipe(
                filter(v => !!v),
                takeUntil(this.ngUnsubscribe)
            )
            .subscribe(value => {
                this.localStorageService.setItem('payMemosThruDateStorage$', value['id']);
            });

        this.payMemosService.storeEmployeeIDNew$
            .pipe(
                filter(v => !!v),
                takeUntil(this.ngUnsubscribe)
            )
            .subscribe(value => {
                this.newEmployeeID(value);
            });
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    public applyFilter(event: any) {
        this.payMemosService.showListPayMemosSwitch$.next(Fields.main);
    }

    private newEmployeeID(value: any) {
        if (value === 'All') {
            this.payMemosService.storeEmployeeID$.next(this.guardPayMemosService.respEmployeeGuardData([{
                StoreEmployeeID: '',
                FirstName: '',
                LastName: '',
            }])[0]);
            this.localStorageService.setItem('payMemosStoreEmployeeIDStorage$', '');
        } else {
            this.payMemosService.storeEmployeeID$.next(value);
            this.localStorageService.setItem('payMemosStoreEmployeeIDStorage$', value['id']);
        }
    }
}
