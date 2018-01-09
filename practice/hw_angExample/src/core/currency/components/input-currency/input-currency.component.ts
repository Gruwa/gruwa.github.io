import {CurrencyService} from '../../';

export class InputCurrencyComponentController {
  // Bindings
  isoCode: string;

  // local variables
  currency = null;

  constructor(private currencyService: CurrencyService) {
    'ngInject';

    this.currency = currencyService.getCurrencyByCode(this.isoCode);
  }
}

export const InputCurrencyComponent: ng.IComponentOptions = {
  template: require('./input-currency.html'),
  transclude: true,
  bindings: {
    isoCode: '<'
  },
  controller: <ng.IControllerConstructor> InputCurrencyComponentController,
  controllerAs: 'vm'
};
