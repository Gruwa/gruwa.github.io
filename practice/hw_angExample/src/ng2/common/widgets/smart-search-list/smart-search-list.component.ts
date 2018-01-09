/* tslint:disable:max-file-line-count */
import * as _ from 'lodash';
import 'rxjs/add/operator/debounceTime';
import {
  Component, forwardRef, ChangeDetectorRef, ContentChild, TemplateRef, Input,
  ViewChild, ChangeDetectionStrategy, Output, EventEmitter, OnInit, AfterViewInit, ElementRef
} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor, NgModel} from '@angular/forms';
import {ItemLabelPipe} from '../../pipes/item-label/item-label.pipe';

export interface IItemTemplateContext {
  item: any;
  isSelected: boolean;
}

interface IItemTemplateContextRegistry {
  [key: string]: any;
}

@Component({
  selector: 'cad-smart-search-list',
  template: require('./smart-search-list.html'),
  styles: [require('./smart-search-list.scss')],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SmartSearchListComponent),
    multi: true
  }],
  host: {
    '(document:keyup.esc)': 'closeFromOutsideEsc()',
    '(document:click)': 'closeFromOutsideClick($event)'
  }
})
export class SmartSearchListComponent implements ControlValueAccessor, OnInit, AfterViewInit {
  @Input() multiselect: boolean; // if to allow multiple items selected; in this mode selection will be an array
  @Input() showGlobalSpinner: boolean; // if to show spinner instead of list
  @Input() showBottomSpinner: boolean; // if to show spinner at the bottom of the list for indicating next page loading
  @Input() groupField: string; // field to group items
  @Input() select2style: boolean; // if to display selected items in search field like in select2 control
  @Input() selectionOverlay: boolean; // if to display overlay above list with selected single item
  @Input() labelField: string; // path to item property that should be rendered as item title
  @Input() trackByField: string; // path to item property that should be used an unique ID for item
  @Input() listHeight: number; // height of the list in px
  @Input() adaptiveHeight: boolean; // height of the list is reduced according to its content
  @Input() searchQuery: string; // text for internal search input
  @Input() noResultsMessage: string; // optional text to  shown when search returns empty result
  @Input() searchPlaceholder: string; // optional placeholder text for internal search input
  @Input() externalSearch: boolean; // if to utilize local search among all items list, or delegate it elsewhere
  @Input() disableSearch = false; // disable search completely
  @Input() renderChunkSize: number; // amount of items in chunk for internal infinite scroll
  @Input() focusOnSearch: boolean = true; // move focus to search input (could be useful inside dropdown)
  @Input() toggleDisabled: boolean = false; // property to disable toggle behaviour for single selection
  @Input() expandOnFocus: boolean; // show options list only when search field is focused
  @Output() searchQueryChange = new EventEmitter<string>(); // emitted when on internal search input changes
  @Output() onNextPage = new EventEmitter<void>(); // emitted when reached end of all items list to request more data

  // binding for actual items list
  @Input()
  set items(value) {
    this.allItems = Array.isArray(value) ? value : [];
    this.updateFilteredItems();
    this.updateVisibleItems(false);
  }

  isListCollapsed: boolean = false;

  private allItems = []; // original items list
  private filteredItems = []; // items after filtration by search query
  private visibleItems = []; // visible portion of filtered items
  private selectedItems = [];

  private onChangeCallback: (value: any) => void;
  private onTouchedCallback: Function;

  private itemTemplateContextRegistry: IItemTemplateContextRegistry = {};

  @ContentChild(TemplateRef) private customItemTemplate: TemplateRef<any>;
  @ViewChild('searchInput', {read: NgModel}) private searchInput: NgModel;
  @ViewChild('list') private list: ElementRef;

  constructor(
    private itemLabelFilter: ItemLabelPipe,
    private changeDetector: ChangeDetectorRef,
    private elementRef: ElementRef
  ) {
    // set dummy placeholders to avoid errors when attempt to call methods before they are assigned to proper handlers
    this.onChangeCallback = _.noop;
    this.onTouchedCallback = _.noop;

    // trackByFn loses context in ngFor
    this.trackByFn = this.trackByFn.bind(this);
  }

  ngOnInit() {
    if (!this.trackByField) {
      throw new Error('SmartSearchList needs "trackByField" property set to work properly');
    }

    if (this.expandOnFocus) {
      this.isListCollapsed = true;
    }
  }

  ngAfterViewInit() {
    if (!this.disableSearch) {
      this.searchInput.valueChanges
        .debounceTime(250)
        .subscribe(() => {
          // skip null and undefined values that get's here on control initialisation phase
          if (_.isNil(this.searchQuery)) { return; }

          this.searchQueryChange.emit(this.searchQuery);
          this.updateFilteredItems();
          this.updateVisibleItems(true);
          this.changeDetector.markForCheck();
        });
    }
  }

  writeValue(value: any) {
    if (Array.isArray(value)) {
      this.selectedItems = [...value];
    } else {
      this.selectedItems = !_.isNil(value) ? [value] : [];
    }

    // markForCheck - fix for case, when model changes outside of smart-search-list
    this.changeDetector.markForCheck();
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  onFocus() {
    this.isListCollapsed = false;
  }

  /**
   * Always return the same object for the same item to prevent extra DOM manipulations.
   * (Otherwise, item component will be created each time, e.g. when "isSelected" flag will is changed)
   */
  getItemTemplateContext(item): IItemTemplateContext {
    const key = item[this.trackByField];

    if (!this.itemTemplateContextRegistry[key]) {
      this.itemTemplateContextRegistry[key] = {};
    }

    // MUTATE this.itemTemplateContextRegistry[item[this.trackByField]]
    _.assign(this.itemTemplateContextRegistry[key], {item, isSelected: this.isSelected(item)});
    return this.itemTemplateContextRegistry[key];
  }

  trackByFn(index, item) {
    return _.get(item, this.trackByField);
  }

  toggle(itemFromList: any) {
    this.onTouchedCallback();

    const itemInSelection = this.findItemInSelection(itemFromList);

    if (this.multiselect) {
      // always return array when multiselect mode in on
      if (itemInSelection) {
        this.selectedItems = _.without(this.selectedItems, itemInSelection);
      } else {
        this.selectedItems = [...this.selectedItems, itemFromList];
      }
      this.onChangeCallback(this.selectedItems);
    } else {
      // return selected item or undefined when it's single selection mode
      if (itemInSelection && this.toggleDisabled) {
        return; // should do nothing when the item is already selected
      } else if (itemInSelection) {
        this.selectedItems = [];
      } else {
        this.selectedItems = [itemFromList];
      }
      this.onChangeCallback(this.selectedItems[0]);
    }
  }

  isAutofocusEnabled() {
    // if expandOnFocus is undefined or set to false
    return this.focusOnSearch && this.expandOnFocus !== true;
  }

  isSelected(item: any): boolean {
    return !_.isEmpty(this.findItemInSelection(item));
  }

  loadNext() {
    const currentLength = this.visibleItems.length;

    // if reached end of the list - emit external event to load more data from external source (like BE)
    if (currentLength > 0 && currentLength === this.allItems.length) {
      this.onNextPage.emit();
      return;
    }

    // do internal infinite scroll
    if (this.renderChunkSize) {
      this.visibleItems = this.filteredItems.slice(0, currentLength + this.renderChunkSize);
    }
  }

  isFirstItemOfGroup(item, itemIndex) {
    const previousItem = this.visibleItems[itemIndex - 1];

    return itemIndex === 0 || item[this.groupField] !== previousItem[this.groupField];
  }

  private findItemInSelection(item: any): any {
    const valueToFind = _.get(item, this.trackByField);
    return _.find(this.selectedItems, selectionItem => {
      return _.get(selectionItem, this.trackByField) === valueToFind;
    });
  }

  // perform local search or assign untouched all items list
  private updateFilteredItems() {
    if (!this.disableSearch && this.searchQuery && !this.externalSearch) {
      this.filteredItems = _.filter(this.allItems, (item) => {
        const value = (this.itemLabelFilter.transform(item, this.labelField) || '').toLowerCase();
        return _.includes(value, this.searchQuery.toLowerCase());
      });
    } else {
      this.filteredItems = this.allItems;
    }
  }

  // update visible part of the list
  private updateVisibleItems(fromBeginning: boolean) {
    if (this.renderChunkSize) {
      if (fromBeginning) {
        // navigate to list top and reset visible items list
        this.list.nativeElement.scrollTop = 0;
        this.visibleItems = this.filteredItems.slice(0, this.renderChunkSize);
      } else {
        // just display the same amount of items as it was before update + one more chunk
        this.visibleItems = this.filteredItems.slice(0, this.visibleItems.length + this.renderChunkSize);
      }
    } else {
      // otherwise show all filtered items at once
      this.visibleItems = this.filteredItems;
    }
  }

  private closeFromOutsideClick($event) {
    // `$event.button ===2` means right button click
    if (this.expandOnFocus && $event.button !== 2 && !this.isEventWithin($event)) {
      this.isListCollapsed = true;
    }
  }

  private closeFromOutsideEsc() {
    if (this.expandOnFocus) {
      this.isListCollapsed = true;
    }
  }

  /**
   * checking if event was triggered on element inside component
   *
   * @param $event: Event
   * @returns {boolean}
   * @private
   */
  private isEventWithin($event: Event): boolean {
    return !!this.elementRef && this.elementRef.nativeElement.contains(<Node> $event.target);
  }
}
