import {
  Component, Input, Output, EventEmitter, ContentChildren,
  QueryList, OnChanges, AfterContentInit, ViewChild
} from '@angular/core';

import {SmartFilterComponent} from './smart-filter.component';
import {IInfoLineItem} from './smart-filter-infoline/smart-filter-infoline.component';
import {SmartFilterModalComponent} from './smart-filter-modal/smart-filter-modal.component';
import {NgbModal} from '../modal-window';
import {Subscription} from 'rxjs/Subscription';

interface  ISmartFilterGroupValue {
  [filterName: string]: any;
}

type ISmartFilterViewType = 'modal' | 'dropdown';

@Component({
  selector: 'cad-smart-filter-group',
  template: require('./smart-filter-group.html'),
  styles: [require('./smart-filter-group.scss')]
})
export class SmartFilterGroupComponent implements OnChanges, AfterContentInit {
  isOpened = false;
  infoLine: IInfoLineItem[];

  @Input() view: ISmartFilterViewType = 'dropdown';
  @Input() label: string;
  @Input() showOverlay = false;
  @Input() autoClose = false;
  @Input() selected: ISmartFilterGroupValue;
  @Input() bodyHeight: number;
  @Input() infoLineLimit = Number.POSITIVE_INFINITY;
  @Output() onApply = new EventEmitter<ISmartFilterGroupValue>();
  @Output() invalid = new EventEmitter<SmartFilterComponent[]>();

  @ViewChild('modalBody')
  private modalBody: any;

  @ContentChildren(SmartFilterComponent)
  private filters: QueryList<SmartFilterComponent>;

  constructor(private modalService: NgbModal) {
  }

  ngAfterContentInit(): void {
    this.resetFiltersValue();
    this.updateInfoLine();
  }

  ngOnChanges(changes): void {
    if (changes.selected) {
      this.resetFiltersValue();
      this.updateInfoLine();
    }
  }

  isCleared(): boolean {
    return _.every(this.filters.toArray(), filter => filter.isCleared());
  }

  isInvalid(): boolean {
    const filtersWithInvalidData = this.filters.filter(filter => !filter.isValid());
    this.invalid.emit(filtersWithInvalidData);

    return filtersWithInvalidData.length > 0;
  }

  clear() {
    this.filters.forEach(filter => filter.clear());
  }

  apply() {
    if (this.isInvalid()) {
      return;
    }

    this.close();
    this.updateInfoLine();
    this.onApply.emit(this.getFiltersValue());
  }

  cancel() {
    this.resetFiltersValue();
    this.close();
  }

  close() {
    this.isOpened = false;
  }

  discard(filter: SmartFilterComponent) {
    filter.clear();
    this.apply();
  }

  onToggle(isOpened: boolean): void {
    this.isOpened = isOpened;
    if (!isOpened) {
      this.cancel();
    }
  }

  onOpenModal(): void {
    if (this.view !== 'modal') {
      throw new Error('Trying to call modal in non-modal mode!');
    }

    const modalRef = this.modalService.open(SmartFilterModalComponent, {size: 'lg'});
    const modalComponent = <SmartFilterModalComponent> modalRef.componentInstance;

    // pass components params
    modalComponent.body = this.modalBody;
    modalComponent.isInvalid = this.isInvalid.bind(this);

    // handle filters clear
    const clearSubscription: Subscription = modalComponent.clear
      .subscribe(() => this.clear());

    // handle filters close/apply
    modalRef.result
      .then(() => this.apply())
      .catch(() => this.cancel())
      .finally(() => {
        clearSubscription.unsubscribe();
      });
  }

  private resetFiltersValue() {
    if (!this.filters) return;

    this.filters.forEach(filter => filter.setValue(this.selected[filter.name]));
  }

  private getFiltersValue(): ISmartFilterGroupValue {
    const value = {};

    this.filters.forEach(filter => {
      value[filter.name] = filter.getValue();
    });

    return value;
  }

  private updateInfoLine() {
    if (!this.filters || !this.filters.length) return;

    this.infoLine = this.filters
      .filter(filter => !filter.isCleared())
      .map(filter => ({
        filter,
        title: filter.label,
        smartTooltip: filter.hasSmartTooltip(),
        label: filter.getLabel(),
        tooltip: filter.getTooltip()
      }));
  }
}
