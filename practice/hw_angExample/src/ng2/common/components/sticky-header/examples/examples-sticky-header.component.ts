import {Component} from '@angular/core';

@Component({
  selector: 'cad-examples-sticky-header',
  template: require('./examples-sticky-header.html'),
  styles: [`
    .sticky-header-example {
      display: flex;
      flex-flow: column;
    }
    .sticky-header-example--sticked {
      flex-flow: column-reverse;
    }
    
    .sticky-header-example__subheader {
      padding: 30px 0;
      transition: padding-top, padding-bottom 0.4s;
    }
    .sticky-header-example__subheader--sticked {
      padding: 10px 0;
      background-color: white;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    
    .sticky-header-example__message {
      background-color: #404040;
      opacity: 0.85;
      text-align: center;
      color: white;
      padding: 7px 0;
    }

    .sticky-header-example /deep/ .cad-button {
      transition: all 0.4s;
    }
  `]
})
export class ExamplesStickyHeaderComponent {}

/* tslint:disable */
@Component({
  selector: 'cad-examples-sticky-header-docs',
  template: require('./examples-sticky-header-docs.html')
})
export class ExamplesStickyHeaderDocsComponent {}
