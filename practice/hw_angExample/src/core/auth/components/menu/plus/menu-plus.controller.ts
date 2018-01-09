import {CurrentUserService} from '../../../services/current-user.service';

interface IPlusButtonItem {
  title: string;
  state: string;
  roles?: string | string[];
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

export class MenuPlusController {
  createBtn: IPlusButtonItem[];
  disable: boolean;

  constructor(
    private $scope: ng.IScope,
    private $state: IPlusButtonStateService,
    private currentUserService: CurrentUserService
  ) {
    'ngInject';

    this.updateCreateBtn();
    this.$scope.$on('$stateChangeSuccess', () => this.updateCreateBtn());
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
        return _.isNil(item.roles) ||
          this.currentUserService.hasPermissions(item.roles);
      })
      // step 4: end chain and unwrap resulted value
      .value();
  }

  getPlusBtnState() {
    return this.disable ? null : this.createBtn[0].state;
  }

  getPlusBtnParams() {
    return this.createBtn[0].stateParams || {};
  }

  getPlusBtnOpts() {
    return this.createBtn[0].stateOptions || {};
  }

  changeState(stateDetailsObj: IPlusButtonItem) {
    if (this.disable) {
      return;
    }

    this.$state.go(
      stateDetailsObj.state,
      stateDetailsObj.stateParams,
      stateDetailsObj.stateOptions
    );
  }
}
