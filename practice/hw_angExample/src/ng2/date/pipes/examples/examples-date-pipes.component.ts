import {Component} from '@angular/core';

@Component({
  selector: 'cad-examples-date-pipes',
  template: require('./examples-date-pipes.html')
})
export class ExamplesDatePipesComponent {
  date2format = new Date();
}
