export interface IPaginationOptions {
  _page?: number;
  _pageSize?: number;
  _totalElements?: number;
  _disabled?: boolean;
}

export interface IPaginatedResponse<T> {
  totalElements?: number;
  totalPages?: number;
  number?: number; // tslint:disable-line
  content: T[];
}

export interface IPagination {
  page: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  setTotalElements(value: number): IPagination;
  setPage(value: number): IPagination;
  isFirstPage(): boolean;
  isLastPage(): boolean;
  goToNextPage(): IPagination;
  goToPrevPage(): IPagination;
  goToLastPage(): IPagination;
  isDisabled(): boolean;
  disable(): IPagination;
  enable(): IPagination;
}

export class Pagination implements IPagination {
  private _page = 0;
  private _pageSize = 10;
  private _totalElements = 0;
  private _totalPages = 0;
  private _disabled = true;

  constructor(options?: IPaginationOptions) {
    _.extend(this, options);

    this.recalcState();
  }

  setTotalElements(value: number) {
    let _this = _.clone(this);

    _this._totalElements = value > 0 ? value : 0;
    _this.recalcState();

    return _this;
  }

  get totalElements() {
    return this._totalElements;
  }

  setPage(value: number) {
    let _this = _.clone(this);

    _this._page = value < 0 ? 0 : value;

    // -1 since page number starts from 0
    let lastPage = _this._totalPages > 0 ? _this._totalPages - 1 : 0;

    if (value > lastPage) {
      _this._page = lastPage;
    }

    return _this;
  }

  get page() {
    return this._page;
  }

  get pageSize() {
    return this._pageSize;
  }

  isFirstPage() {
    return this._page === 0;
  }

  isLastPage() {
    // we use +1 since page number start from 0
    return (this._page + 1) === this._totalPages || this._totalPages === 0;
  }

  get totalPages() {
    return this._totalPages;
  }

  goToNextPage() {
    let _this = _.clone(this);

    return _this.setPage(_this._page + 1);
  }

  goToPrevPage() {
    let _this = _.clone(this);

    return _this.setPage(_this._page - 1);
  }

  goToLastPage() {
    let _this = _.clone(this);

    return _this.setPage(_this.totalPages - 1);
  }

  isDisabled() {
    return this._disabled;
  }

  disable() {
    let _this = _.clone(this);

    _this._disabled = true;

    return _this;
  }

  enable() {
    let _this = _.clone(this);

    _this._disabled = false;

    return _this;
  }

  recalcState(): void {
    this.recalculateTotalPages();
    this.recalculateDisabledState();
    this.recalculateCurrentPage();
  }

  private recalculateTotalPages() {
    this._totalPages = Math.ceil(this._totalElements / this._pageSize);
  }

  private recalculateDisabledState() {
    this._disabled = Boolean(this._totalElements <= this._pageSize);
  }

  private recalculateCurrentPage() {
    this._page = Boolean(this._totalElements <= this._pageSize) ? 0 : this._page;
  }
}
