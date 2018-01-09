import {Component} from '@angular/core';

@Component({
  selector: 'cad-examples-smart-tooltip',
  template: require('./examples-tooltip.html')
})
export class ExamplesSmartTooltipComponent {
  placement = 'bottom';
  textWidth = 100;
  html = false;
  clipboard = true;
  enabled = true;
  smart = true;
  trigger = 'hover';
  fullText = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.';
  tooltipText =
      '<b>Consequatur culpa, dicta</b>, doloremque et minus, nam numquam pariatur quas quo quod reiciendis sequi?<br>'
    + 'Blanditiis <strike>exercitationem</strike> ipsa, magni quis <u>reiciendis tempore</u> voluptatem.';

  customTooltipItems = [
    {text: 'iPhone 5', value: 299.95},
    {text: 'iPhone 5s', value: 400},
    {text: 'iPhone 6', value: 500},
    {text: 'iPhone 6s', value: 600},
    {text: 'iPhone 7', value: 749.99}
  ];
}
