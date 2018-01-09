import * as moment from 'moment';
import {DateRangeConfigService} from '../../services/date-range-config.service';

export default (ngModule) => {
  /*@ngInject*/
  function CadDateRangeFilter(dateRangeConfigService: DateRangeConfigService) {
    let defaultConfiguration = {
      ranges: {
      },
      opens: 'right'
    };

    return {
      link,
      template: require('./date-range-filter.html'),
      restrict: 'E',
      scope: {
        placeholder: '@',
        dateRange: '=',
        dateRangeOptions: '='
      },
      controllerAs: 'vm',
      controller,
      bindToController: true
    };

    function controller() {
      let vm = this;
      vm.dateRangeOptions = _.extend({}, dateRangeConfigService.get(), defaultConfiguration, vm.dateRangeOptions);
    }

    function link(scope, element) {
      let closeButton = angular.element(element[0].querySelector('.close-holder'));
      let inputElement = angular.element(element[0].querySelector('input'));
      let filterEl = angular.element(element[0].querySelector('.date-range-filter'));

      closeButton.on('click', () => {
        let dateRangePicker = angular.element(inputElement).data('daterangepicker');
        dateRangePicker.setStartDate(moment());
        dateRangePicker.setEndDate(moment());
        scope.vm.dateRange = {startDate: null, endDate: null};
        scope.$apply();
      });

      scope.$watch('vm.dateRange', (value) => {
        filterEl.removeClass('active');
        if (_.isObject(value) && value.startDate && value.endDate) {
          filterEl.addClass('active');
        }
      });
    }
  }

  ngModule.directive('cadDateRangeFilter', CadDateRangeFilter);
};
