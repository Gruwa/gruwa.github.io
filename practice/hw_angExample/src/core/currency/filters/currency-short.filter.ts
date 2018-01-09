export function CadCurrencyShort($filter: ng.IFilterService, currencyFilterFactory) {
  'ngInject';
  return currencyFilterFactory($filter('cadNumberShort'));
}
