import '../number/number.module.spec';

import ngModule from './currency.module';

import currencyFilterSpec from './filters/currency.filter.spec';
import currencyShortFilterSpec from './filters/currency-short.filter.spec';
import currencyFilterFactorySpec from './filters/currency-filter.factory.spec';

currencyShortFilterSpec(ngModule);
currencyFilterSpec(ngModule);
currencyFilterFactorySpec(ngModule);

export default ngModule;
