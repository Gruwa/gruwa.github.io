import {Component} from '@angular/core';

@Component({
  selector: 'cad-examples-number-pipes',
  template: require('./examples-number-pipes.html')
})
export class ExamplesNumberPipesComponent {
  digitsInput = '1.2-2';
  digitsSmallInput = '1.2-2';
  digitsBigInput = '1.0-0';
}
