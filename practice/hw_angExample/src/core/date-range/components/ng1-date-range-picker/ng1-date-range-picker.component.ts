export const Ng1DateRangePickerComponent: ng.IComponentOptions = {
  template: require('./ng1-date-range-picker.component.html'),
  bindings: {
    dateRange: '=',
    dateRangeOptions: '<',
    placeholder: '@'
  },
  controllerAs: 'vm'
};
