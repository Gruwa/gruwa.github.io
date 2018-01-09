import {
  Component, Input, Output, EventEmitter,
  ViewChild, ElementRef
} from '@angular/core';

export type ChipSize = 'default' | 'small';
export type ChipColor = 'default' | 'blue' | 'grey' | 'light-grey';
export type ChipType = 'default' | 'single-line';

@Component({
  selector: 'cad-chip',
  template: require('./chip.html'),
  styles: [require('./chip.scss')]
})
export class ChipComponent {
  @Input() text: string;
  @Input() size: ChipSize = 'default';
  @Input() color: ChipColor = 'default';
  @Input() type: ChipType = 'default'; // tslint:disable-line
  @Input() isHtml: boolean = false;
  @Input() showIcon: boolean = true;
  @Input() errorMessage: string;
  @Output() onDelete = new EventEmitter<any>();

  @ViewChild('transcludeRef') transcludeRef: ElementRef;

  get isCustom(): boolean {
    return this.transcludeRef.nativeElement.children.length > 0;
  }
}
