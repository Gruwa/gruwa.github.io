import {Component} from '@angular/core';

@Component({
  selector: 'cad-examples-panel',
  template: require('./examples-panel.html')
})
export class ExamplesPanelComponent {
  isExpanded: boolean;
  isDisabled: boolean;

  onExpandAction() {
    console.log('Panel expanded'); // tslint:disable-line
  }

  onCollapseAction() {
    console.log('Panel collapsed'); // tslint:disable-line
  }
}
