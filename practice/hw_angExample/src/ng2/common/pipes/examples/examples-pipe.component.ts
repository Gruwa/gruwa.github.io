import {Component} from '@angular/core';

@Component({
  selector: 'cad-examples-common-pipes',
  template: require('./examples-pipe.html')
})
export class ExamplesCommonPipesComponent {
  highlightSearch: string = 'dolor';
  highlightText = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur doloribus iusto laborum modi perferendis quam quis quod, recusandae reprehenderit totam? Dignissimos doloribus enim eum, harum necessitatibus quis rem reprehenderit soluta?'; // tslint:disable-line

  percentageInput = 12345.67890;
  percentInput = 12345.67890;
  digitsInput = '1.0-2';

  usernameInput = 'jhon.dhoe';
}
