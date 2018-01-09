import * as _ from 'lodash';
import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Input, OnInit, TemplateRef, ViewEncapsulation
} from '@angular/core';
import {NavigationMenuComponent} from '../navigation-menu/navigation-menu.component';
import {MainHeaderService} from './main-header.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Component({
  selector: 'cad-main-header',
  template: require('./main-header.html'),
  styles: [require('./main-header.scss')],
  // use "none" due to styles for "icon-plus" and whitelabeling (not 100% sure)
  encapsulation: ViewEncapsulation.None // TODO: get rid of "None"
})
export class MainHeaderComponent implements OnInit {
  @Input() showSubheader: boolean; // if to show subheader (usually it is disabled in forbidden mode)
  @Input() navMenu: NavigationMenuComponent; // main navigation component, used to open navigation from header

  // share sticked state with everyone interested (usually sticked header component)
  sticked$ = new BehaviorSubject(false);
  stickyHeaderTemplate: TemplateRef<any>;

  constructor(
    public headerService: MainHeaderService,
    @Inject('$state') private $state: ng.ui.IStateService
  ) {}

  ngOnInit() {
    this.headerService.headerInstance = this;
  }

  onStickedChange(value: boolean) {
    this.sticked$.next(value);
  }

  setStickyHeader(template: TemplateRef<any>) {
    this.stickyHeaderTemplate = template;
  }

  removeStickyHeader(template: TemplateRef<any>) {
    // don't reset sticky header template if there's another one already shown
    if (this.stickyHeaderTemplate === template) {
      this.stickyHeaderTemplate = null;
    }
  }

  get headerTitle(): string {
    return _.get(this.$state.current, 'data.headerTitle');
  }

  get headerSubtitle(): string {
    return _.get(this.$state.current, 'data.headerSubtitle');
  }

  get isMultiMarketsTooltipEnabled(): boolean {
    return _.get(this.$state.current, 'data.hasMultiMarketsTooltip', false);
  }

  openNavMenu() {
    this.navMenu.open();
  }

  gotoHeaderUrl() {
    const stateName = _.get(this.$state.current, 'data.headerState');
    if (stateName) {
      this.$state.go(stateName, {}, {reload: true, inherit: false});
    }
  }
}
