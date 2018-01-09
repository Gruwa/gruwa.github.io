import {
  Component, Input
} from '@angular/core';

@Component({
  selector: 'cad-tags',
  template: require('./tags.html'),
  styles: [require('./tags.scss')]
})
export class TagsComponent {
  @Input() items = [];
}
