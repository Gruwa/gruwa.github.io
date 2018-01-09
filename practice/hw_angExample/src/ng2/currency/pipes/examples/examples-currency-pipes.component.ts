import {Component} from '@angular/core';

@Component({
  selector: 'cad-examples-currency-pipes',
  template: require('./examples-currency-pipes.html')
})
export class ExamplesCurrencyPipesComponent {
  digitsInput = '1.2-2';
  digitsSmallInput = '1.2-2';
  digitsBigInput = '1.0-0';
  currencyCode = 'USD';
}
