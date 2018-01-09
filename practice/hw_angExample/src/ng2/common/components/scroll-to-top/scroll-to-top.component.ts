import {Component, Inject, Input} from '@angular/core';
import {WindowService} from '../../services/window/window.service';

@Component({
  selector: 'cad-scroll-to-top',
  template: require('./scroll-to-top.html'),
  styles: [require('./scroll-to-top.scss')]
})
export class ScrollToTopComponent {
  @Input() stickyFrom = 1000;

  constructor(
    @Inject(WindowService) private $window: Window
  ) { }

  scrollToTop() {
    this.$window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
