import { Injectable } from '@angular/core';
import {
	IObjectFieldPayMemo, IPayMemo, IPeriod
} from '../interfaces/pay-memo.interface';
import * as moment from 'moment';
import {
	LookupItem
} from '@app/activities/purchase/invoices/invoice.models';
import { DataPayMemosService } from '@app/activities/pay-memos/services/data.pay-memos.service';

@Injectable()
export class GuardPayMemosService {

	constructor(private dataPayMemosService: DataPayMemosService) {
	}

	public respGuardPayMemos(resp: any): IPayMemo[] {

		return resp.map(obj => {

			return Object.entries(obj).reduce((resultObj, [key, val]) => {
				const listFields = this.dataPayMemosService.LIST_FIELDS_PAY_MEMO[key];

				if (listFields) {
					switch (key) {
						case 'StoreEmployee':
							if (this.compareStoreEmployee(val)) {
								resultObj[listFields] = this.transformStoreEmployee(val);
							}
							break;
						case 'Job':
							if (this.compareJob(val)) {
								resultObj[listFields] = this.transformJob(val);
							}
							break;
						case 'BusinessDate':
							resultObj[listFields] = this.transformBusinessDate(val);
							break;
						case 'Memo':
							resultObj[listFields] = this.transformMemo(val);
							break;
						case 'Origin':
							resultObj[listFields] = this.transformOrigin(val);
							break;
						case 'Amount':
							resultObj[listFields] = this.transformAmountAndOriginalAmount(val);
							break;
						case 'OriginalAmount':
							resultObj[listFields] = this.transformAmountAndOriginalAmount(val);
							break;
						default:
							resultObj[listFields] = val;
							break;
					}
				}

				return resultObj;
			}, {});
		});
	}

	public respGuardPeriodPayMemos(resp: any): IPeriod {
		const resultObj: IPeriod = {
			allowEditTodaysData: false,
			approved: false,
			availablePeriodEnd: '',
			availablePeriodStart: '',
			currentPeriodEnd: '',
			currentPeriodStart: '',
			unitStartTime: '',
		};

		Object.entries(resp).forEach(
			([k, v]) => {
				resultObj[this.dataPayMemosService.LIST_FIELDS_PERIOD[k]] = v;
			}
		);

		return resultObj;
	}

	public respEmployeeGuardData(resp: any): IObjectFieldPayMemo[] {
		return resp.map(el => {
			const resultObj = {
				id: el['StoreEmployeeID'],
				description: `${el['FirstName']}` + ' ' + `${el['LastName']}`,
				sortOrder: 0,
			};

			return new LookupItem(resultObj);
		});
	}

	public respMemoGuardData(resp: any): IObjectFieldPayMemo[] {
		return resp.map(el => {
			const resultObj = {
				id: el['MemoID'],
				description: el['Description'],
			};

			return new LookupItem(resultObj);
		});
	}

	public respJobsGuardData(resp: any): IObjectFieldPayMemo[] {
		return resp.map(el => {
			const resultObj = {
				id: el['Job']['JobID'],
				description: el['Job']['Job'],
			};

			return new LookupItem(resultObj);
		});
	}

	public reqGuardDataPayMemos(data: any, id?: string): object {
		return {
			PayMemoID: id ? id : '',
			StoreEmployee: {
				StoreEmployeeID: data['employee']['id'],
			},
			Job: {
				JobID: data['job']['id'],
			},
			BusinessDate: data['businessDate']['id'],
			Memo: {
				MemoID: data['memo']['id'],
			},
			Hours: data['hours'],
			Amount: isNaN(data['amount']) ? data['amount'].slice(1) : data['amount'],
			Comment: data['comment'],
			Origin: {
				OriginID: data['origin']['id'],
			},
		};
	}

	private compareStoreEmployee(v: object): boolean {
		return v && v['StoreEmployeeID'] && v['FirstName'] && v['LastName'];
	}

	private transformStoreEmployee(v: object): LookupItem {
		const firstName = v['FirstName'].trim();
		const lastName = v['LastName'].trim();

		return new LookupItem({
			id: v['StoreEmployeeID'],
			description: firstName + ' ' + lastName,
		});
	}

	private compareJob(v: object): boolean {
		return v && v['JobID'] && v['Job'];
	}

	private transformJob(v: object): LookupItem {
		return new LookupItem({
			id: v['JobID'],
			description: v['Job'],
		});
	}

	private transformBusinessDate(v: object): LookupItem {
		return new LookupItem({
			id: moment(v).format('YYYY-MM-DD') + 'T00:00:00.000Z',
			description: moment(v).format('MM/DD/YYYY'),
		});
	}

	private transformMemo(v: object): LookupItem {
		return new LookupItem({
			id: v['MemoID'],
			description: v['Description'],
			allowEditHours: v['AllowEditHours'],
			mandatoryAmount: v['MandatoryAmount'],
			allowEdit: v['AllowEdit'],
		});
	}

	private transformOrigin(v: object): LookupItem {
		return new LookupItem({
			id: v['OriginID'],
			description: v['Description'],
		});
	}

	private transformAmountAndOriginalAmount(v: any): string {
		if (!v) v = 0.00;

		return v.toFixed(this.dataPayMemosService.DATA_CURRENCY_AND_DIGIT_AFTER_POINT.digit);
	}
}
