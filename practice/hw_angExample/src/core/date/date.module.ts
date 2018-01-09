import dateFilter from './filters/date.filter';

const ngModule = angular.module('cadreon.core.date', [
  'pascalprecht.translate'
]);

dateFilter(ngModule);

export default ngModule;
