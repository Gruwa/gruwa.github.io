import {Component, Input, Output, EventEmitter} from '@angular/core';
import {trigger, style, transition, animate} from '@angular/animations';

@Component({
  selector: 'cad-panel',
  template: require('./panel.html'),
  styles: [require('./panel.scss')],
  animations: [
    trigger('enterAnimation', [
      transition(':enter', [
        style({opacity: 0}),
        animate('300ms', style({opacity: 1}))
      ]),
      transition(':leave', [
        style({opacity: 1}),
        animate('300ms', style({opacity: 0}))
      ])
    ])
  ]
})
export class PanelComponent {
  @Input() headTitle: string;
  @Input() isOpen: boolean = false;
  @Input() disabled: boolean = false;
  @Output() isOpenChange = new EventEmitter<boolean>();
  @Output() onOpen = new EventEmitter<void>();
  @Output() onClose = new EventEmitter<void>();

  toggle() {
    if (this.disabled) {
      return;
    }

    this.isOpen = !this.isOpen;
    this.isOpenChange.emit(this.isOpen);

    if (this.isOpen) {
      this.onOpen.emit();
    } else {
      this.onClose.emit();
    }
  }

  // prevent panel toggling on custom header content click
  stopEventPropagation($event: Event) {
    $event.stopPropagation();
  }
}
