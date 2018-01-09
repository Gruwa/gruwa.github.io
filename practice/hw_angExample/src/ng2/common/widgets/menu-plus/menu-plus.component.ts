import {Component, Inject, Input, OnDestroy} from '@angular/core';
import {CurrentUserService} from '../../../../core/auth/services/current-user.service';

interface IPlusButtonItem {
  title: string;
  state: string;
  requiredPermissions?: string | string[];
  stateOptions?: ng.ui.IStateOptions;
  stateParams?: ng.ui.IStateParamsService;
}

interface IPlusButtonStateService extends angular.ui.IStateService {
  current: {
    data: {
      createBtn: IPlusButtonConfig;
    }
  };
}

type IPlusButtonConfig = IPlusButtonItem | { dropdown: IPlusButtonItem[] };

@Component({
  selector: 'cad-menu-plus',
  template: require('./menu-plus.html'),
  styles: [require('./menu-plus.scss')]
})
export class MenuPlusComponent implements OnDestroy {
  @Input('disabled') isDisabled: boolean = false;

  createBtn: IPlusButtonItem[];
  unSubscribe: () => void;

  constructor(
    @Inject('$rootScope') private $rootScope: ng.IRootScopeService,
    @Inject('$state') private $state: IPlusButtonStateService,
    @Inject('currentUserService') private currentUserService: CurrentUserService

  ) {
    this.updateCreateBtn();
    this.unSubscribe = this.$rootScope.$on('$stateChangeSuccess', () => this.updateCreateBtn());
  }

  ngOnDestroy() {
    this.unSubscribe();
  }

  updateCreateBtn() {
    const passedData = <IPlusButtonConfig> _.get(this.$state, 'current.data.createBtn', {});

    // lets find all requested actions for plus button
    // step 0: remember empty array
    this.createBtn = _.chain([])
    // step 1: add content of `dropdown` field to it
      .concat(<IPlusButtonItem[]> _.get(passedData, 'dropdown'))
      // step 2: add content of `createBtn` field excluding `dropdown` to it
      .concat(<IPlusButtonItem> _.omit(passedData, 'dropdown'))
      // step 3: drop from result all items that
      //   are undefined, or empty objects/array
      .reject(_.isEmpty)
      // step 4: drop from result all items that
      //   does not follow current's user permissions
      .filter((item: IPlusButtonItem) => {
        return _.isNil(item.requiredPermissions) ||
          this.currentUserService.hasPermissions(item.requiredPermissions);
      })
      // step 4: end chain and unwrap resulted value
      .value();
  }

  getPlusBtnState() {
    return this.isDisabled ? null : this.createBtn[0].state;
  }

  getPlusBtnParams() {
    return this.createBtn[0].stateParams || {};
  }

  getPlusBtnOpts() {
    return this.createBtn[0].stateOptions || {};
  }

  changeState(stateDetails: IPlusButtonItem) {
    if (this.isDisabled) {
      return;
    }

    this.$state.go(
      stateDetails.state,
      stateDetails.stateParams,
      stateDetails.stateOptions
    );
  }

  trackByItem(index: number, item: IPlusButtonItem): string {
    return item.title;
  }
}
