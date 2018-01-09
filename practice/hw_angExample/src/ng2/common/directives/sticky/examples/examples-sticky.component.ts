import {Component} from '@angular/core';

@Component({
  selector: 'cad-examples-sticky',
  template: require('./examples-sticky.html'),
  styles: [`
    .is-fixed {
      position: fixed;
      z-index: 999;
      top: 90px;
      left: 0;
      width: 100%;
      text-align: center;
      padding: 10px 0;
      background-color: #1c89a3;
      color: #fff;
    }
  `]
})
export class ExamplesStickyComponent {
  changed(value) {
    console.log('sticked', value); // tslint:disable-line
  }
}
