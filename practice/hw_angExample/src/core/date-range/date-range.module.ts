import {DateRangeConfigService} from './services/date-range-config.service';
import {DateRangePickerDirective} from './components/date-range-picker/date-range-picker.directive';
import dateRangeFilterDirective from './components/date-range-filter/date-range-filter.directive';
import {
  Ng1DateRangePickerComponent
} from './components/ng1-date-range-picker/ng1-date-range-picker.component';

const ngModule = angular.module('cadreon.core.dateRange', [
  'pascalprecht.translate'
]);

/**
 * -- Migrated services to ng2 --
 * We have to declare them in this way as donwngradeInjectoble doesn't work in tests
 */
ngModule.factory('dateRangeConfigService', ($translate: ng.translate.ITranslateService) => {
  'ngInject';
  return new DateRangeConfigService($translate);
});

ngModule.directive('dateRangePicker', DateRangePickerDirective);
dateRangeFilterDirective(ngModule);
ngModule.component('dateRangePickerWrapper', Ng1DateRangePickerComponent);

export default ngModule;
