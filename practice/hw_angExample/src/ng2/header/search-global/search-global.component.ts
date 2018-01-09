import * as _ from 'lodash';
import {Component, Inject, ElementRef, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {UrlParamsBrokerService} from '../../../core/services/url-params-broker/url-params-broker.service';

@Component({
  selector: 'cad-search-global',
  template: require('./search-global.html'),
  styles: [require('./search-global.scss')]
})
export class SearchGlobalComponent {
  enabled: boolean;
  collapsed = true;
  searchQueryControl = new FormControl();

  @ViewChild('searchInput') searchInput: ElementRef;

  private alive = true;

  constructor(
    @Inject('$rootScope') private $rootScope: ng.IRootScopeService, // TODO: Migrate from scope
    @Inject('$state') private $state: ng.ui.IStateService,
    @Inject('urlParamsBrokerService') private urlParamsBrokerService: UrlParamsBrokerService
  ) {
    this.searchQueryControl.valueChanges
      .debounceTime(500)
      .subscribe(this.onQueryChange.bind(this));
  }

  ngOnInit() {
    this.initParams(this.$state.current);

    this.urlParamsBrokerService.urlParamChanges()
      .filter(change => change.param === 'q')
      .takeWhile(() => this.alive)
      .subscribe(change => {
        if (change.value) {
          this.collapsed = false;
        }

        this.searchQueryControl.setValue(change.value);
      });

    this.$rootScope.$on('$stateChangeSuccess', (event, toState) => {
      this.initParams(toState);
    });
  }

  ngOnDestroy() {
    this.alive = false;
  }

  initParams(state: ng.ui.IState): void {
    const query = this.urlParamsBrokerService.getParam('q');
    this.searchQueryControl.setValue(query);
    this.collapsed = _.isEmpty(query);
    this.enabled = _.get(state, 'data.searchEnabled', false);
  }

  onClick(event: MouseEvent): void {
    event.stopPropagation();

    if (this.collapsed || _.isEmpty(this.searchQueryControl.value)) {
      this.collapsed = !this.collapsed;
    }

    if (!this.collapsed) {
      this.focusInput();
    }
  }

  onQueryChange(query: string): void {
    this.urlParamsBrokerService.setParam('q', query);
  }

  clear(event: MouseEvent) {
    event.stopPropagation();
    this.searchQueryControl.setValue('');
    this.focusInput();
  }

  onClickOutside(event: MouseEvent): void {
    if (_.isEmpty(this.searchQueryControl.value)) {
      this.collapsed = true;
    }
  }

  private focusInput(): void {
    this.searchInput.nativeElement.focus();
  }
}
