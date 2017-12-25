import { Component } from '@angular/core';

@Component({
  selector: 'app-inline',
  template: '<h1>{{jesus}}</h1>',
})
export class InlineComponent {
  public jesus = 'Jesus Statham';
}
