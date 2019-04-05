import {
	Component,
	OnInit,
	Input,
	OnDestroy,
	ChangeDetectionStrategy,
	ViewChild
} from '@angular/core';
import { PayMemosService } from '../services/pay-memos.service';
import {
	ActivatedRoute,
	Router
} from '@angular/router';
import { LocalStorageService } from '@services/local-storage.service';
import {
	BehaviorSubject,
	Subject
} from 'rxjs';
import { Async } from '@models/decorators';
import { DocumentToolbarDirective } from '@editor/directives';
import { GuardPayMemosService } from '@app/activities/pay-memos/services/guard-pay-memos.service';
import { PayrollAPIService } from '@services/api/payroll';
import { SaveCallbackType } from '@editor/editor.component';
import { LookupItem } from '@app/activities/purchase/invoices/invoice.models';
import { filter } from 'rxjs/operators';

@Component({
	selector: 'rmc-new-pay-memo',
	templateUrl: './new-pay-memo.component.html',
	styleUrls: ['./new-pay-memo.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewPayMemoComponent implements OnInit, OnDestroy {
	public disabledJobPayMemos$: BehaviorSubject<boolean> = new BehaviorSubject(true);

	public dataOrigin: LookupItem = new LookupItem({
		id: 'M',
		description: 'Manual',
	});

	private ngUnsubscribe: Subject<void> = new Subject<void>();

	@Input() disabled: boolean = false;

	@Async() changed$: boolean = true;

	@Async() readonly$: boolean = false;

	@ViewChild(DocumentToolbarDirective) toolbar: DocumentToolbarDirective;

	constructor(
		public payMemosService: PayMemosService,
		private localStorageService: LocalStorageService,
		private route: ActivatedRoute,
		private guardPayMemosService: GuardPayMemosService,
		private payrollAPIService: PayrollAPIService,
		private router: Router,
	) {
	}

	ngOnInit(): void {
		this.payMemosService.pageTitlePayMemos$.next('New Pay Memo');
		this.payMemosService.storePayMemos$.pipe(
			filter(value => value && value['memo'])
		).subscribe(value => {
			this.payMemosService.activeMemo$.next(value['memo']);
			this.disabledJobPayMemos$.next(false);
		});
	}

	ngOnDestroy(): void {
		this.ngUnsubscribe.next();
		this.ngUnsubscribe.complete();
	}

	public onSave(e: any): void {
		if (e && e['newPayMemo']) {
			this.save(e['newPayMemo']);
		}
	}

	private save(date: object): void {
		if (this.payMemosService.editObjectPayMemoForSave(date)) {
			this.payrollAPIService.PayrollPayMemosEP.post(
				this.guardPayMemosService.reqGuardDataPayMemos(date)
			).then((value) => {
				if (value) {
					this.payMemosService.payMemosActiveListSwitch$.next(value);
				}
				this.payMemosService.dataSavedResult$.next(SaveCallbackType.success);
				this.router.navigate(['/activities/paymemos']);
			});
		}
	}
}
