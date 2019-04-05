export class DataPayMemosService {

	public LIST_FIELDS_PAY_MEMO = {
		Amount: 'amount',
		BusinessDate: 'businessDate',
		Comment: 'comment',
		Hours: 'hours',
		Job: 'job',
		Memo: 'memo',
		Origin: 'origin',
		OriginalAmount: 'originalAmount',
		PayMemoID: 'payMemoID',
		StoreEmployee: 'employee',
	};

	public LIST_FIELDS_PERIOD = {
		AllowEditTodaysData: 'allowEditTodaysData',
		Approved: 'approved',
		AvailablePeriodEnd: 'availablePeriodEnd',
		AvailablePeriodStart: 'availablePeriodStart',
		CurrentPeriodEnd: 'currentPeriodEnd',
		CurrentPeriodStart: 'currentPeriodStart',
		UnitStartTime: 'unitStartTime',
	};

	public DATA_CURRENCY_AND_DIGIT_AFTER_POINT = {
		digit: 2,
		currency: '$',
	};
}
