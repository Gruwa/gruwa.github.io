import {Component} from '@angular/core';
import {SelectType} from '../select.component';

@Component({
  selector: 'cad-examples-select',
  template: require('./examples-select.html')
})
export class ExamplesSelectComponent {
  isDisabled = false;
  isSmall = false;
  headLabel = '[1]';
  headColor = 'default';
  trackByField = 'id';
  items = [
    null,
    {id: 111, title: 'Lorem ipsum dolor sit amet'},
    {id: 222, title: 'Consectetur adipisicing elit'},
    {id: 333, title: 'Adipisci aliquid commodi culpa'},
    {id: 444, title: 'dolorem ea earum est et eum labore'},
    {id: 555, title: 'maiores'},
    {id: 666, title: 'maxime'},
    {id: 777, title: 'nom nom nom'},
    {id: 888, title: 'praesentium'},
    {id: 999, title: 'bla bla bla'}
  ];
  selected: any;
  type: SelectType = 'default'; // tslint:disable-line

  ngOnInit() {
    this.selected = this.items[1];
  }
}
