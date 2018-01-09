import {CurrentUserService} from '../../../services/current-user.service';
import {AdminPagesService} from '../../../../../ng2/common/services/admin-pages/admin-pages.service';

export interface IDropdownItem {
  title: string;
  name: string;
  state?: string;
  link?: string;
}

export class MenuDropdownController {
  customElement: {
    dropdown: IDropdownItem[]
  };

  constructor(
    private $scope: ng.IScope,
    private $state: ng.ui.IStateService,
    private $window: ng.IWindowService,
    private currentUserService: CurrentUserService,
    private adminPagesService: AdminPagesService
  ) {
    'ngInject';
  }

  $onInit() {
    // after migration main view to ng2 this component is created after initial state change
    // therefor need to manually build menu items once control is created
    this.customElement = this.getCustomElement();

    this.$scope.$on('$stateChangeSuccess', () => {
      this.customElement = this.getCustomElement();
    });
  }

  getCustomElement() {
    let data: any = _.clone(_.get(this.$state, 'current.data.customElement'));

    if (data && data.dropdown === 'adminpages') {
      data.dropdown = this.adminPagesService.getAdminPages();
    }

    if (!data) {
      return null;
    }

    data.dropdown = _(data.dropdown).chain()
      .filter((item: any) => this.currentUserService.hasPermissions(item.requiredPermissions))
      .filter((item: any) => this.currentUserService.isActiveMarketWithin(item.requiredMarkets || []))
      .value();

    return data;
  }

  itemOnClick(item) {
    if (item.state) {
      this.$state.go(item.state);
    } else {
      this.$window.location.href = item.link;
    }
  }
}
