// TODO: move this component to "/app-bootstrap" dir when refactor general app bootsrap process
import {Component, Inject, OnInit} from '@angular/core';
import {AppService} from '../../common/services/app/app.service';
import {INavigationMenuItem} from '../navigation-menu/navigation-menu.component';
import {GlobalEventsService} from '../../common/services/global-events/global-events.service';
import {CurrentUserService} from '../../../core/auth/services/current-user.service';
import {MessageService} from '../../message/simple/message.service';
import {SystemToastMessageService} from '../../message/system/system-toast-message.service';
import {WindowService} from '../../common/services/window/window.service';

@Component({
  selector: 'cad-main-view',
  template: require('./main-view.html'),
  styles: [require('./main-view.scss')]
})
export class MainViewComponent implements OnInit {
  menuItems: INavigationMenuItem[];
  isPageAllowed: boolean;

  constructor(
    private appService: AppService,
    private globalEventsService: GlobalEventsService,
    private messageService: MessageService,
    private systemToastMessageService: SystemToastMessageService,
    @Inject(WindowService) private $window: cad.IWindowService,
    @Inject('$state') private $state: ng.ui.IStateService,
    @Inject('$rootScope') private $rootScope: ng.IRootScopeService,
    @Inject('$cacheFactory') private $cacheFactory: ng.ICacheFactoryService,
    @Inject('currentUserService') private currentUserService: CurrentUserService
  ) {}

  ngOnInit() {
    this.menuItems = this.getMenuItems();

    this.isPageAllowed = this.currentUserService.isStateAllowed(this.$state.current);
    this.$rootScope.$on('$stateChangeSuccess', (event, toState) => {
      this.isPageAllowed = this.currentUserService.isStateAllowed(toState);
    });

    this.$rootScope.$on('logout-success', () => this.$cacheFactory.get('$http').removeAll());
    this.$rootScope.$on('logout-success', () => this.messageService.clearAllToasts());
    this.$rootScope.$on('logout-success', () => this.systemToastMessageService.clearAllToasts());
    this.$rootScope.$on('forbidden:show-page-wrapper', () => this.isPageAllowed = false); // for backward compatibility
    this.$rootScope.$on('forbidden:hide-page-wrapper', () => this.isPageAllowed = true); // for backward compatibility
    this.globalEventsService.on('cad-forbidden-page:show', () => this.isPageAllowed = false);
    this.globalEventsService.on('cad-forbidden-page:hide', () => this.isPageAllowed = true);
  }

  private getMenuItems(): INavigationMenuItem[] {
    const permATV = this.appService.getAppByName('atv').permissions;
    const permCM = this.appService.getAppByName('cm').permissions;
    const onlyATV = this.currentUserService.hasPermissions(permATV) && !this.currentUserService.hasPermissions(permCM);
    let campaignsItem: any = {};

    if (onlyATV) {
      campaignsItem.title = 'left_menu.advanced_tv';
      campaignsItem.name = 'advancedtv';
      campaignsItem.permissions = permATV;
      campaignsItem.url = this.appService.getAppByName('atv').entryUrl;
    } else {
      campaignsItem.title = 'left_menu.campaigns';
      campaignsItem.name = 'campaigns';
      campaignsItem.permissions = permCM;
      campaignsItem.url = this.appService.getAppByName('cm').entryUrl;
    }

    return [
      {
        title: 'left_menu.insertion_orders',
        name: 'insertion-orders',
        permissions: this.appService.getAppByName('csf').permissions,
        url: this.appService.getAppByName('csf').entryUrl,
        type: 'main',
        visible: true
      },
      {
        title: campaignsItem.title,
        name: campaignsItem.name,
        permissions: campaignsItem.permissions,
        url: campaignsItem.url,
        type: 'main',
        visible: true
      },
      {
        title: 'left_menu.marketplace',
        name: 'marketplace',
        permissions: this.appService.getAppByName('marketplace').permissions,
        url: this.appService.getAppByName('marketplace').entryUrl,
        type: 'main',
        visible: true
      },
      {
        title: 'left_menu.marketplace-analytics',
        name: 'mkt-analytics',
        permissions: this.appService.getAppByName('marketplace-analytics').permissions,
        url: this.appService.getAppByName('marketplace-analytics').entryUrl,
        type: 'main',
        visible: true
      },
      {
        title: 'left_menu.totaltag',
        name: 'totaltag',
        permissions: this.appService.getAppByName('utag').permissions,
        url: this.appService.getAppByName('utag').entryUrl,
        type: 'main',
        visible: true
      },
      {
        title: 'left_menu.creatives',
        name: 'creatives',
        permissions: this.appService.getAppByName('creatives').permissions,
        url: this.appService.getAppByName('creatives').entryUrl,
        type: 'main',
        visible: true
      },
      {
        title: 'left_menu.reports',
        name: 'reporting',
        permissions: this.appService.getAppByName('reporting').permissions,
        url: this.appService.getAppByName('reporting').entryUrl,
        type: 'main',
        visible: true
      },
      {
        title: 'left_menu.amp',
        name: 'amp',
        permissions: this.appService.getAppByName('amp').permissions,
        url: this.appService.getAppByName('amp').entryUrl,
        type: 'main',
        visible: true
      },
      {
        title: 'left_menu.taxonomies',
        name: 'taxonomies',
        permissions: this.appService.getAppByName('taxonomies').permissions,
        url: this.appService.getAppByName('taxonomies').entryUrl,
        type: 'main',
        visible: true
      },
      {
        title: 'left_menu.publisher_data_manager',
        name: 'datamanager',
        permissions: this.appService.getAppByName('datamanager').permissions,
        url: this.appService.getAppByName('datamanager').entryUrl,
        type: 'main',
        visible: true
      },
      {
        // temporary commented, as we need to replace title while we will not get
        // another new application
        // title: 'left_menu.dashboards',
        title: 'left_menu.planning_and_booking',
        name: 'dashboards',
        permissions: this.appService.getAppByName('dashboards').permissions,
        url: this.appService.getAppByName('dashboards').entryUrl,
        type: 'main',
        visible: true
      },
      {
        title: 'left_menu.tools',
        name: 'tools',
        permissions: this.appService.getAppByName('tools').permissions,
        url: this.appService.getAppByName('tools').entryUrl,
        type: 'secondary',
        visible: true
      },
      {
        title: 'left_menu.optimization',
        name: 'optimization',
        permissions: this.appService.getAppByName('optimization').permissions,
        url: this.appService.getAppByName('optimization').entryUrl,
        type: 'main',
        visible: true
      },
      {
        title: 'left_menu.accounts',
        name: 'advertisers.',
        permissions: ['cad_access_advertisers', 'cad_access_csf_accounts'],
        url: this.appService.getAppPath('csf') + '#/advertisers',
        type: 'secondary',
        visible: true
      },
      {
        title: 'left_menu.administration',
        name: 'home.administration',
        permissions: 'cad_access_administration',
        url: this.appService.getAppPath('shell') + '#/administration',
        type: 'secondary',
        visible: true
      },
      {
        title: 'left_menu.finance',
        name: 'finance.',
        permissions: [
          'cad_access_data_rates',
          'cad_access_csf_edit_io_finance'
          // temporarily disabled until ClientProducts and Platform Fees will be not implemented (UIO-1417)
          // 'cad_access_advertisers_client_products',
        ],
        url: this.appService.getAppPath('csf') + '#/finance',
        type: 'secondary',
        visible: true
      }
    ];
  }
}
