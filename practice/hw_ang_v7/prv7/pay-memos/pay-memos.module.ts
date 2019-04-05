import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@app/material.module';
import { PayMemosComponent } from './pay-memos.component';
import { PayMemosService } from './services/pay-memos.service';
import { TableModule } from '@components/table';
import {
	RouterModule,
	Routes
} from '@angular/router';
import { AuthGuard } from '@services/auth-guard.service';
import { DataPayMemosService } from './services/data.pay-memos.service';
import { ReviewPayMemoComponent } from './review-pay-memo/review-pay-memo.component';
import { NewPayMemoComponent } from './new-pay-memo/new-pay-memo.component';
import { ListFlatModule } from '@components/link-list-flat/link-list-flat.module';
import { LocalStorageService } from '@services/local-storage.service';
import { MenuContentService } from '@components/right-menu/menu-content';
import { RightMenuModule } from '@components/right-menu';
import { DataFilterModule } from '@components/data-filter/data-filter.module';
import { GuardPayMemosService } from './services/guard-pay-memos.service';
import { DocumentEditorModule } from '@editor/editor.module';

export const routes: Routes = [
	{
		path: '',
		component: PayMemosComponent,
		data: {
			title: 'Edit Pay Memos',
			previousPage: 'activities'
		},
		canActivate: [AuthGuard],
	},
	{
		path: 'card/additem',
		component: NewPayMemoComponent,
		data: {
			title: 'New Pay Memos',
			previousPage: 'paymemos',
			hideRightMenuButton: true
		},
		canActivate: [AuthGuard],
	},
	{
		path: 'card/:id',
		component: ReviewPayMemoComponent,
		data: {
			title: 'Review Pay Memo',
			previousPage: 'paymemos',
			hideRightMenuButton: true
		},
		canActivate: [AuthGuard],
	},
];

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		FormsModule,
		MaterialModule,
		TableModule,
		ListFlatModule,
		RightMenuModule,
		DataFilterModule,
		DocumentEditorModule,
	],
	declarations: [
		PayMemosComponent,
		ReviewPayMemoComponent,
		NewPayMemoComponent,
	],
	providers: [
		PayMemosService,
		DataPayMemosService,
		LocalStorageService,
		MenuContentService,
		GuardPayMemosService,
	],
})
export class PayMemosModule {
}
