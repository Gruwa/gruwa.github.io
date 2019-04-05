import {
	ChangeDetectionStrategy,
	Component,
	OnDestroy,
	OnInit,
	ViewChild,
	ViewEncapsulation
} from '@angular/core';
import { PayMemosService } from '../services/pay-memos.service';
import { LocalStorageService } from '@services/local-storage.service';
import {
	Subject
} from 'rxjs';
import {
	filter,
	map,
	takeUntil
} from 'rxjs/operators';
import {
	ActivatedRoute,
	Router
} from '@angular/router';
import { GuardPayMemosService } from '../services/guard-pay-memos.service';
import { Async } from '@models/decorators';
import { DocumentToolbarDirective } from '@editor/directives';
import { PayrollAPIService } from '@services/api/payroll';
import { SaveCallbackType } from '@editor/editor.component';
import { DataPayMemosService } from '@app/activities/pay-memos/services/data.pay-memos.service';

/**
 * Review TimeCard Component
 *
 * ************
 * !!! All data for this component in guard need create from "new Lookups.LookupBase()" factory !!!
 * Lookups.LookupBase wait for obj with id and description fields
 *
 * ******************
 * In this component was implementing Editor component DocumentEditorComponent
 *
 * in modul of component need add DocumentEditorModule, CompositeOptionLinkModule
 *
 * in html was add
 * <rmc-document-editor> component with options
 * [title]="pageTitle$ | async" flow with title of page
 * [busy]="busy$ | async" flow for activate line what show waiting time for data
 * [readOnly]="readonly$ | async" flow turn off save and delete button in Tollbar
 * (save)="onSave($event)" method for save changes
 * (delete)="onDelete($event)" method for delete element
 *
 * inside add tabs <rmd-document-grid> - for table, or <rmd-document-group> - for list
 * with options
 * description="TIME CARDS" - name of tab
 * name="lines"
 * [readOnly]="false" - permission for edit elements of tab
 * [lines]="timeCardsService.timeCards$ | async" - data for parsin
 *
 * *******
 * in <rmd-document-grid> adding <rmd-document-field>
 *
 * ******
 * <rmd-document-field
 * [name]="'employee'" - field in object for receiving data in document-field
 * [editor]="'search-filter-with-radio-group'" - what editor using
 * [description]="'Employee'" - description what showing in template
 * [required]="true" - required or not field
 * (valueChange)="storeVendor$ = $event" - emit obj of changes from document-field
 * [lookupRequest$]="dataTimeCardEmployees$" - flow with Array of data for displaying in menu
 * [disabled]="generalFieldDisabled$ | async"> - flow for disabled or not this document-field
 * </rmd-document-field>
 * in this case [lookupRequest$] wait for Array of LookupBase objects
 * ex:
 *  LookupBase {
 *  description: "Vivian  Li"
 *  id: "14269c22-994a-4e6f-9b2e-01d7d7185c1b"
 *  sortOrder: 0
 *  __proto__: LookupItem
 *  }
 *  - LookupBase object create with "new Lookups.LookupBase()" factory
 *
 * ******
 * <rmd-document-field
 * [name]="'businessDate'"
 * [editor]="'calendar'"
 * [required]="true"
 * [lookupList]="timeCardsService.periodTimeCards$ | async"
 * [description]="'Business Date'"
 * [disabled]="generalFieldDisabled$ | async">
 * </rmd-document-field>
 * wait businessDate: LookupBase {sortOrder: 0, id: "2017-09-11T00:00:00.000Z", description: "2017-09-11"}
 * id it's json date in format 2017-09-11T00:00:00.000Z
 *
 **************SIDE BAR MENU**********************
 * for activate side bar menu create in template
 * <rmd-document-menu>
 * <ng-template let-editor$="editor$" let-document_field$="document_field$">
 * </ng-template>
 * </rmd-document-menu>
 *
 * in rmd-document-menu => ng-template adding all component what we want show in sidebar
 *
 * ******
 * <menu-single-select *ngSwitchCase="'single-select'"
 * [(value)]="currentParameter.var.tempValueID"
 * [allowAll]="currentParameter.var.allowAll"
 * [selectedValue]="currentParameter.var.currentValueID"
 * [valueList]="currentParameter.var.lookupRequest | async">
 * </menu-single-select>
 * add list of single select with search
 *
 */

@Component({
	selector: 'rmc-edit-pay-memo',
	templateUrl: './review-pay-memo.component.html',
	styleUrls: ['./review-pay-memo.component.scss'],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewPayMemoComponent implements OnInit, OnDestroy {
	private ngUnsubscribe: Subject<void> = new Subject<void>();

	private activeID: string = this.route.snapshot['url'][1]['path'];

	@Async() readonly$: boolean = false;

	@Async() changed$: boolean = true;

	@ViewChild(DocumentToolbarDirective) toolbar: DocumentToolbarDirective;

	constructor(
		public payMemosService: PayMemosService,
		public dataPayMemosService: DataPayMemosService,
		private localStorageService: LocalStorageService,
		private route: ActivatedRoute,
		private guardPayMemosService: GuardPayMemosService,
		private payrollAPIService: PayrollAPIService,
		private router: Router,
	) {
	}

	ngOnInit(): void {
		this.payMemosService.pageTitlePayMemos$.next('Review Pay Memo');
		this.payMemosService.dataPayMemo$
			.pipe(
				takeUntil(this.ngUnsubscribe)
			)
			.subscribe(value => this.payMemosService.busy$.next(!value));
		this.getDataPayMemo();
		this.payMemosService.storePayMemos$
			.pipe(
				takeUntil(this.ngUnsubscribe)
			)
			.subscribe(value => {
					if (value && value['memo']) {
						this.payMemosService.activeMemo$.next(value['memo']);
					}
				}
			);
	}

	ngOnDestroy(): void {
		this.ngUnsubscribe.next();
		this.ngUnsubscribe.complete();
	}

	public onSave(e: any): void {
		if (e && e['editPayMemo']) {
			this.save(e['editPayMemo']);
		}
	}

	public onDelete(): void {
		this.payrollAPIService.deletePayrollPayMemoEPM
			.delete(this.activeID)
			.then(() => {
				this.delete();
			});
	}

	private delete(): void {
		this.payMemosService.dataSavedResult$.next(SaveCallbackType.success);
		this.payMemosService.payMemosActiveListSwitch$.next(this.activeID);
		this.payrollAPIService.saveCards(this.activeID);
		this.payrollAPIService.getPayrollPayMemoEPM.clearflowCache(this.activeID);
		this.router.navigate(['/activities/paymemos']);
	}

	private save(data: object): void {
		if (this.payMemosService.editObjectPayMemoForSave(data)) {
			this.payrollAPIService.PayrollPayMemosEP
				.patch(
					this.guardPayMemosService.reqGuardDataPayMemos(
						data,
						this.activeID
					)
				)
				.then(value => {
					if (value) {
						this.payMemosService.payMemosActiveListSwitch$.next([value]);
						this.payrollAPIService.saveCards(this.activeID, this.guardPayMemosService.respGuardPayMemos([value])[0], true);
					}

					this.payMemosService.dataSavedResult$.next(SaveCallbackType.success);
					this.router.navigate(['/activities/paymemos']);
				});
		}
	}

	private getDataPayMemo(): void {
		const cards = this.payMemosService.cardsFlow$.getValue();
		const cardIndex = cards.findIndex(c => c.payMemoID === this.activeID);

		if (cardIndex !== -1 && this.payMemosService.compareDate(cards[cardIndex]['refreshTime'])) {
			this.changeCard(cards[cardIndex]);
		} else {
			this.payrollAPIService.getPayrollPayMemoCard(this.activeID)
				.pipe(
					takeUntil(this.ngUnsubscribe),
					filter(value => !!value),
					map(v => this.guardPayMemosService.respGuardPayMemos(v)[0])
				)
				.subscribe(card => {
					this.changeCard(card);
				});
		}
	}

	private changeCard(card: any) {
		this.payrollAPIService.saveCards(card['payMemoID'], card);
		this.payMemosService.dataPayMemo$.next(card);
		this.payMemosService.generalFieldDisabled$.next(card['memo']['allowEdit']);
		this.payMemosService.editHoursDisabled$.next(card['memo']['allowEditHours']);
		this.payMemosService.mandatoryAmountDisabled$.next(card['memo']['mandatoryAmount']);
		this.payMemosService.activeMemo$.next(this.payMemosService.dataPayMemo$.getValue().memo);
	}
}
