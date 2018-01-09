import * as moment from 'moment';

export default function CadDateTimePickerDirective(): ng.IDirective {
  'ngInject';

  let defaultOptions = {
    datepickerOpts: {
      format: 'LLL'
    }
  };

  let directive = {
    link: _linkFn,
    require: '?ngModel',
    restrict: 'AE'
  };

  function _linkFn($scope: ng.IScope, $element: ng.IAugmentedJQuery, $attrs, ngModelCtrl) {
    let passedInOptions = $scope.$eval($attrs.cadDateTimePicker);
    let options = _.merge({datepickerOpts: {locale: moment.locale()}}, defaultOptions, passedInOptions);
    let datepickerOpts = options.datepickerOpts;
    let strictParsing = !!options.strictParsing;
    let modelFormat = null;
    let viewFormat = null;

    if (!options.modelFormat) {
      throw 'modelFormat should be defined';
    }

    modelFormat = options.modelFormat;
    viewFormat = datepickerOpts.format;

    jQuery($element)
      .on('dp.change', (e: any) => {
        if (ngModelCtrl) {
          ngModelCtrl.$setViewValue(e.target.value);
        }
      })
      .on('dp.show', (e: any) => {
        if (options.onOpen) {
          options.onOpen($element);
        }
      })
      .datetimepicker(datepickerOpts);

    jQuery($element)
      .on('focusout', (e: any) => {
        ngModelCtrl.$setViewValue(e.target.value);
      });

    setPickerValue();

    function setPickerValue() {
      let date = null;
      let dp = <any> jQuery($element).data('DateTimePicker');

      if (ngModelCtrl && ngModelCtrl.$viewValue) {
        date = ngModelCtrl.$viewValue;
      }

      if (ngModelCtrl.$viewValue) {
        dp.date(moment(date, modelFormat));
      } else {
        dp.clear();
      }
    }

    jQuery($element)
      .next('.input-group-btn')
      .find('.btn')
      .on('click', jQuery($element).data('DateTimePicker').toggle);

    if (ngModelCtrl) {
      ngModelCtrl.$render = () => {
        setPickerValue();
      };
    }

    ngModelCtrl.$parsers.unshift((viewValue) => {
      return moment(viewValue, viewFormat, strictParsing).format(modelFormat);
    });
  }

  return directive;
}
