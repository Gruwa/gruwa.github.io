import {Component} from '@angular/core';
import {SupportService} from '../';

@Component({
  selector: 'cad-support-button',
  template: require('./support-button.html'),
  styles: [require('./support-button.scss')]
})
export class SupportButtonComponent {
  constructor(private supportService: SupportService) {}

  openPopup() {
    this.supportService.openPopup();
  }

  isPopupOpened(): boolean {
    return this.supportService.isPopupOpened();
  }
}
