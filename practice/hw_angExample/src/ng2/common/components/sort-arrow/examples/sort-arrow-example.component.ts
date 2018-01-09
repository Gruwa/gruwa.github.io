import {Component} from '@angular/core';

@Component({
  selector: 'cad-examples-sort-arrow',
  template: require('./sort-arrow-example.html'),
  styles: [require('./sort-arrow-example.scss')]
})

export class ExamplesSortArrowComponent {
  userDrivedOrderValue = 'asc';
}
