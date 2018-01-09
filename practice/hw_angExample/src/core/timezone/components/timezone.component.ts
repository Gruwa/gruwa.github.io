import {TimezoneService, ITimezoneInfo} from '../services/timezone.service';

const DROPDOWN_CONTENT_COLOR = 'grey';

class TimezoneController {
  // input
  inputTimezone: string;
  inputContentColor: string;
  limit: number = 48;

  // output
  triggerTimezoneSelectEvent: (arg: {timezone: string}) => void;

  timezone: ITimezoneInfo;

  constructor(private $scope: ng.IScope,
              private timezoneService: TimezoneService) {
    'ngInject';
  }

  $onInit() {
    if (!this.inputContentColor) {
      this.inputContentColor = DROPDOWN_CONTENT_COLOR;
    }
  }

  $onChanges(changes: ng.IOnChangesObject) {
    /* tslint:disable:no-string-literal */
    if (changes['inputTimezone']) {
      this.timezone = this.timezoneService.getTimezoneByName(changes['inputTimezone'].currentValue);
    }
  }

  changeTimezone(timezone: ITimezoneInfo) {
    this.timezone = timezone;
    this.triggerTimezoneSelectEvent({timezone: timezone.name});
    this.$scope.$broadcast('dropdown:close');
  }

}

export const TimezoneComponent: ng.IComponentOptions = {
  template: require('./timezone.html'),
  bindings: {
    inputTimezone: '<timezone',
    inputPosition: '@position',
    inputContentColor: '@contentColor',
    triggerTimezoneSelectEvent: '&onTimezoneSelected',
    limit: '@?limit'
  },
  controller: TimezoneController,
  controllerAs: 'vm'
};
