import numberModule from '../number';

import {CurrencyService} from './services/currency.service';

import {InputCurrencyComponent} from './components/input-currency/input-currency.component';

import {CadCurrency} from './filters/currency.filter';
import {CadCurrencyShort} from './filters/currency-short.filter';
import {currencyFilterFactory} from './filters/currency-filter.factory';

const ngModule = angular.module('cadreon.core.currency', [
  numberModule.name
]);

/**
 * -- Migrated services to ng2 --
 * We have to declare them in this way as donwngradeInjectoble doesn't work in tests
 */
ngModule.factory('currencyService', ($log: ng.ILogService) => {
  'ngInject';
  return new CurrencyService(<any> $log);
});

// In ngx this component is named as cadCurrencyInput
ngModule.component('cadInputCurrency', InputCurrencyComponent);

ngModule.filter('cadCurrency', CadCurrency);
ngModule.filter('cadCurrencyShort', CadCurrencyShort);
ngModule.factory('currencyFilterFactory', currencyFilterFactory);

export default ngModule;
