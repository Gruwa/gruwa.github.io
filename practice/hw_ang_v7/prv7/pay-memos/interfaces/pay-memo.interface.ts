export interface IBasePayMemo {
	id: string;
	description: string;
}

export interface IObjectFieldPayMemo extends IBasePayMemo {
	sortOrder?: number;
}

export interface IPayMemo {
	amount: number;
	businessDate: IObjectFieldPayMemo;
	comment: string;
	hours: number;
	job: IObjectFieldPayMemo;
	memo: IMemo;
	origin: IObjectFieldPayMemo;
	originalAmount: number;
	payMemoID: string;
	employee: IObjectFieldPayMemo;
	refreshTime: string;
}

export interface IMemo extends IObjectFieldPayMemo {
	allowEditHours: boolean;
	mandatoryAmount: boolean;
	allowEdit: boolean;
}

export interface IPeriod {
	allowEditTodaysData: boolean;
	approved: boolean;
	availablePeriodEnd: string;
	availablePeriodStart: string;
	currentPeriodEnd: string;
	currentPeriodStart: string;
	unitStartTime: string;
}

export enum Fields {
	sleep = 'sleep',
	main = 'main',
}
