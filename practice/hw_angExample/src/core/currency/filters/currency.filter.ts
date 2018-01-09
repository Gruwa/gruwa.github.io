export function CadCurrency($filter: ng.IFilterService, currencyFilterFactory) {
  'ngInject';
  return currencyFilterFactory($filter('cadNumber'));
}
