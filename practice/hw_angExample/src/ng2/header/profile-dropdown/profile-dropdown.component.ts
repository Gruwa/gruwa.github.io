import * as _ from 'lodash';
import {Component, Inject} from '@angular/core';
import {AppService} from '../../common/services/app/app.service';
import {MarketsService, IMarket} from '../../common/services/markets/markets.service';
import {CurrentUserService} from '../../../core/auth/services/current-user.service';
import {WindowService} from '../../common/services/window/window.service';
import {ConfigService} from '../../common/services/config/config.service';
import {AuthService} from '../../../core/auth/services/auth.service';

@Component({
  selector: 'cad-profile-dropdown',
  template: require('./profile-dropdown.html'),
  styles: [require('./profile-dropdown.scss')]
})
export class ProfileDropdownComponent {
  userTitle: string;
  ddLinks: Object;
  isDropdownOpened: boolean;
  isMultiMarketsEnabled: boolean;
  isMarketsSubmenuVisible: boolean;
  availableMarkets: IMarket[] = [];

  constructor(
    private appService: AppService,
    private configService: ConfigService,
    private marketsService: MarketsService,
    @Inject('authService') private authService: AuthService,
    @Inject('currentUserService') private currentUserService: CurrentUserService,
    @Inject(WindowService) private $window: cad.IWindowService,
    @Inject('$rootScope') private $rootScope: ng.IRootScopeService,
    @Inject('$state') private $state: ng.ui.IStateService
  ) {}

  ngOnInit() {
    const shellPath = this.appService.getAppPath('shell');
    this.ddLinks = {
      administration: shellPath + '#/administration/alerts/list',
      profile: shellPath + '#/profile',
      support: shellPath + '#/support'
    };

    this.isMultiMarketsEnabled = this.marketsService.isMultiMarketsEnabled();

    // build list of markets available for current user
    if (this.marketsService.isUserHasMarketWithIsoCodeALL(this.currentUserService.user)) {
      // show full list of markets without actual "all markets" item
      // Todo: add spinner for responsiveness
      this.marketsService.getAll().then((markets: IMarket[]) => {
        this.availableMarkets = _.reject(markets, {isoCode: 'ALL'});
      });

    } else {
      this.marketsService.getMarketsByISOCodes(this.currentUserService.availableMarkets)
        .then((markets: IMarket[]) => {
          this.availableMarkets = markets;
        });
    }

    this.$rootScope.$on('logout', () => this.logout());
    this.updateUserTitle();
  }

  openDocumentation() {
    const CLIENT_PERMISSION = 'cad_role_id_5';
    if (this.currentUserService.hasPermissions(CLIENT_PERMISSION)) {
      this.$window.open(this.configService.documentationLinks.pdf);
    } else {
      this.$window.open(this.configService.documentationLinks.wiki);
    }
  }

  closeDropdown() {
    this.isDropdownOpened = false;
  }

  toggleDropdown(open: boolean) {
    this.isDropdownOpened = open;
    this.isMarketsSubmenuVisible = false;
  }

  toggleMarketsSubmenu($event: Event) {
    $event.stopPropagation(); // prevent closing dropdown on inside click

    if (this.availableMarkets.length > 1) {
      this.isMarketsSubmenuVisible = !this.isMarketsSubmenuVisible;
    }
  }

  updateMarketSelection(market: IMarket) {
    this.isMarketsSubmenuVisible = false;
    this.currentUserService.setMarket(market);
    this.$rootScope.$broadcast('active-market:changed');
    const event = this.$rootScope.$broadcast('active-market:before-reload');
    if (!event.defaultPrevented) {
      this.$state.reload();
    }
    this.updateUserTitle();
  }

  logout() {
    this.authService.revoke().then(() => {
      this.$rootScope.$broadcast('logout-success');
      this.authService.clearAfterLoginURL();
      this.$state.go('login');
    });
  }

  // use this approach to update username in header only when needed, otherwise it flickers during logout
  private updateUserTitle() {
    let title = _.get(this.currentUserService.user, 'firstName', '');
    if (this.isMultiMarketsEnabled) {
      title += ', ' + this.currentUserService.market;
    }

    this.userTitle = title;
  }
}
