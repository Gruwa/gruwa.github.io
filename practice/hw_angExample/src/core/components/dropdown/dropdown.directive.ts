interface ICadDropdownScope extends ng.IScope {
  position: string;
}

const POSITION_TOP = 'top';
const POSITION_BOTTOM = 'bottom';
const POSITION_LEFT = 'left';
const POSITION_RIGHT = 'right';

export class CadDropdownController {
  // Input
  disable: boolean;
  showCloseButton: string;
  position: string | string[];
  color: string;
  contentColor: string;

  visible: boolean = false;
  positions: string[] = [];

  constructor(public $scope: ICadDropdownScope, // used to be public as used in SmartSearchListController
              private $rootScope: ng.IRootScopeService,
              private $timeout: ng.ITimeoutService,
              private $log: ng.ILogService) {
    'ngInject';
  }

  $onInit() {
    if (!this.contentColor) {
      this.contentColor = this.color;
    }

    this.$scope.$on('dropdown:open', this.open.bind(this));
    this.$scope.$on('dropdown:close', this.close.bind(this));

    if (angular.isArray(this.position)) {
      this.positions = angular.copy(<string[]> this.position);
    } else {
      this.positions = _.split(_.trim(<string> this.position), /\s+/);
    }

    if (_.isEmpty(_.intersection(this.positions, [POSITION_TOP, POSITION_BOTTOM]))) {
      this.positions.push(POSITION_BOTTOM);
    }

    if (_.isEmpty(_.intersection(this.positions, [POSITION_LEFT, POSITION_RIGHT]))) {
      this.positions.push(POSITION_LEFT);
    }

    if (_.intersection<string>(this.positions, [POSITION_TOP, POSITION_BOTTOM]).length === 2) {
      this.$log.warn('dropdown could not have top and bottom position simultaneously');
      _.remove(this.positions, POSITION_BOTTOM);
    }

    if (_.intersection<string>(this.positions, [POSITION_LEFT, POSITION_RIGHT]).length === 2) {
      this.$log.warn('dropdown could not have left and right position simultaneously');
      _.remove(this.positions, POSITION_RIGHT);
    }

  }

  close() {
    if (this.visible) {
      this.$scope.$emit('dropdown:beforeClose');
      this.visible = false;
      this.$timeout(() => {
        this.$scope.$emit('dropdown:afterClose');
      });
    }
  }

  open() {
    this.$rootScope.$broadcast('dropdown:close'); // close all other dropdowns across the app

    this.$scope.$emit('dropdown:beforeOpen');
    this.visible = true;
    this.$timeout(() => {
      this.$scope.$emit('dropdown:afterOpen');
      this.$scope.$broadcast('autofocus:activate');
    });
  }

  click(event: Event) {
    event.stopPropagation();
    if (!this.disable) {
      if (this.visible) {
        this.close();
      } else {
        this.open();
      }
    }
  }

  isCloseButton(): boolean {
    return this.showCloseButton === 'true';
  }
}

export function CadDropdownDirective(): ng.IDirective {
  'ngInject';

  function _compileFn(element, attr) {
    let dropdownTitleElement = element.find('.dropdown__title');

    if (attr.widthLimit) {
      dropdownTitleElement.attr('cad-smart-tooltip-enable', 'cad-smart-tooltip-enable');
      dropdownTitleElement[0].style.maxWidth = attr.widthLimit + 'px';
      dropdownTitleElement.addClass('three-dots');
    } else if (attr.limit) {
      dropdownTitleElement.attr('tooltip-enable', 'vm.head.length > vm.limit');
    }
  }

  return {
    template: require('./dropdown.html'),
    restrict: 'E',
    transclude: {
      title: '?cadDropdownTitle'
    },
    scope: {
      head: '@',
      color: '@',
      contentColor: '@',
      position: '@',
      icon: '@',
      limit: '@',
      widthLimit: '@',
      visible: '=?',
      size: '@',
      disable: '=?',
      isError: '=?',
      tooltipContent: '@?',
      showTooltip: '@',
      showCloseButton: '@',
      closeButtonAction: '&',
      visibilityAction: '@',
      customClass: '@'
    },
    bindToController: true,
    controller: CadDropdownController,
    controllerAs: 'vm',
    compile: _compileFn
  };
}
