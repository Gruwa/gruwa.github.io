import {Component} from '@angular/core';

@Component({
  selector: 'cad-examples',
  template: require('./examples.html'),
  styles: [`
    :host {
      margin-top: -20px;
      display: block;
    }
    :host /deep/ textarea.examples__copy {
      width: 100%;
      background-color: #fafafa;
      display: block;
      margin-top: 20px;
      margin-bottom: 20px;
      overflow: hidden;
      font-family: Consolas, monospace;
      font-size: 12px;
    }
    :host /deep/ .examples__params {
      border: 1px solid #ddd;
      border-radius: 10px;
      padding: 20px;
      background-color: lavender;
      margin-bottom: 20px;
    }
    :host /deep/ .examples__params__note {
      font-style: italic;
    }
    :host /deep/ .examples__params .bb {
        border-bottom: 1px solid rgba(134, 126, 187, 0.5);
    }
  `]
})
export class ExamplesComponent {
}
