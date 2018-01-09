import {AfterViewInit, Component, Inject, OnInit, TemplateRef, ViewChild} from '@angular/core';

interface ICustomTemplate {
  name: string;
  template: TemplateRef<any>;
}

@Component({
  selector: 'cad-examples-smart-search-list',
  template: require('./examples-smart-search-list.html')
})
export class ExamplesSmartSearchListComponent implements OnInit, AfterViewInit {
  chunkSize = 20;
  listHeight = 360;
  selection: any;
  searchQuery: string;
  activeExample = 'default';
  isMultiselect = false;

  items: any[];

  @ViewChild('listItemCustom') listItemCustom: TemplateRef<any>;
  @ViewChild('listItemDefault') listItemDefault: TemplateRef<any>;
  @ViewChild('listItemSubtext') listItemSubtext: TemplateRef<any>;

  customTemplateList: ICustomTemplate[] = [];
  activeCustomTemplate: ICustomTemplate;

  private smallList: any[];
  private largeList: any[];

  private isPageLoading: boolean;
  private isGlobalLoading: boolean;
  private isItemGroups: boolean;
  private groupField: string;
  private pageSize = this.chunkSize; // how many items to load from BE per one request
  private currentPage = 0;
  private totalPages: number; // how many items available on BE at all

  constructor(
    @Inject('$http') private $http: ng.IHttpService
  ) {}

  ngOnInit() {
    this.smallList = this.generateList(300);
    this.largeList = this.generateList(100000);
  }

  ngAfterViewInit() {
    this.customTemplateList.push({
      name: 'Custom',
      template: this.listItemCustom
    });
    this.customTemplateList.push({
      name: 'Default',
      template: this.listItemDefault
    });
    this.customTemplateList.push({
      name: 'Subtext',
      template: this.listItemSubtext
    });
    this.activeCustomTemplate = this.customTemplateList[0];
  }

  changeExample(value) {
    this.activeExample = value;
  }

  load(isBig: boolean) {
    if (isBig) {
      if (this.chunkSize || confirm('Are you sure? Don\'t do this without "render by chunks"!')) {
        this.items = this.largeList;
      }
    } else {
      this.items = this.smallList;
    }
    this.selection = this.items[2];

    if (this.isItemGroups) {
      this.items = _.sortBy(this.items, this.groupField);
    }
  }

  clear() {
    this.items = [];
    this.selection = [];
  }

  clearSelection() {
    if (!this.isMultiselect) {
      this.selection = null;
    } else {
      this.selection = this.selection.splice(this.selection.length);
    }
  }

  searchAdvertisers(searchStr: string) {
    this.isGlobalLoading = true;

    this.loadFromBE(searchStr, 0)
      .then((data) => {
        this.items = data.content;
        this.totalPages = data.totalPages;
      })
      .catch(() => {
        this.items = [];
        this.totalPages = 0;
      })
      .finally(() => {
        this.currentPage = 0;
        this.isGlobalLoading = false;
      });
  }

  loadMoreAdvertisers() {
    if (this.isPageLoading || this.currentPage + 1 === this.totalPages) { return; }

    this.isPageLoading = true;
    const nextPage = this.currentPage + 1;

    this.loadFromBE(this.searchQuery, nextPage)
      .then((data) => {
        this.items = this.items.concat(data.content); // create *new* array as OnPush strategy requires new reference
        this.totalPages = data.totalPages;
        this.currentPage = nextPage;
      })
      .finally(() => {
        this.isPageLoading = false;
      });
  }

  private loadFromBE(searchStr: string, page: number): ng.IPromise<any> {
    const config = {
      prefix: 'csf',
      cache: true,
      params: {
        sort: 'name',
        page: page || 0,
        size: this.pageSize || 20,
        searchCriteria: searchStr || ''
      }
    };
    return this.$http.get('advertisers', config).then(resp => resp.data);
  }

  private generateList(size: number): any[] {
    let result = [];
    for (let i = 0; i < size; i++) {
      result.push({
        id: i,
        nameField: this.generateName(),
        market: this.generateRandomWord(2)
      });
    }
    return result;
  }

  private generateName(): string {
    const words = _.random(1, 5);
    let result = [];
    for (let i = 0; i < words; i++) {
      result.push(_.capitalize(this.generateRandomWord(_.random(1, 12))));
    }
    return result.join(' ');
  }

  private generateRandomWord(size: number): string {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < size; i++) {
      result += alphabet[_.random(0, alphabet.length - 1)];
    }
    return result;
  }
}
