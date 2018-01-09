import {Component, Inject, ElementRef, ViewChild, TemplateRef, HostBinding} from '@angular/core';
import {trigger, style, transition, animate} from '@angular/animations';
import * as _ from 'lodash';
import {WindowService} from '../../services/window/window.service';
import {MessageService} from '../../../message/simple/message.service';

export type TooltipPlacements = 'top' | 'top-left' | 'top-right' | 'bottom' | 'bottom-left' | 'bottom-right';

@Component({
  selector: 'cad-tooltip',
  template: require('./tooltip.html'),
  styles: [require('./tooltip.scss')],
  animations: [
    trigger('enterAnimation', [
      transition(':enter', [
        style({opacity: 0}),
        animate('150ms linear', style({opacity: 1}))
      ]),
      transition(':leave', [
        style({opacity: 1}),
        animate('150ms linear', style({opacity: 0}))
      ])
    ])
  ],
  host: {
    '[@enterAnimation]': 'true',
    '(document:copy)': 'onClipboardEvent($event)'
  }
})
export class TooltipComponent {
  text: string;
  isHTML: boolean = false;
  placement: TooltipPlacements = 'bottom';
  isClipboard: boolean = true;
  hostElement: HTMLElement;
  customTemplate: TemplateRef<any>;
  customClass = '';
  @HostBinding('style.left.px') posLeft: number;
  @HostBinding('style.top.px') posTop: number;

  private isMac: boolean;
  private margin = 5 + 3; // distance from host element to tooltip div (5px for triangle and 3px is distance to it)
  private macOsRegexp = /Mac OS/i;
  @ViewChild('tooltipTextSpan') private tooltipTextSpan: ElementRef;

  constructor(
    private tooltipEl: ElementRef,
    private messageService: MessageService,
    @Inject(WindowService) private $window: Window
  ) {}

  ngOnInit() {
    this.isMac = this.macOsRegexp.test(this.$window.navigator.userAgent);
  }

  // at this hook tooltip box size is already available, so we can calculate correct position where to render it
  ngAfterViewInit() {
    this.setPosition();
  }

  private setPosition() {
    let top: number;
    let left: number;
    const host: ClientRect = this.hostElement.getBoundingClientRect(); // element where tooltip requested
    const self: ClientRect = this.tooltipEl.nativeElement.getBoundingClientRect(); // tooltip itself
    const topOffset = host.top + this.$window.scrollY;

    if (_.startsWith(this.placement, 'top')) {
      top = topOffset - self.height - this.margin;
    }
    if (_.startsWith(this.placement, 'bottom')) {
      top = topOffset + host.height + this.margin;
    }

    switch (this.placement) {
      case 'top-left':
      case 'bottom-left':
        left = host.left;
        break;
      case 'top-right':
      case 'bottom-right':
        left = host.left + host.width - self.width;
        break;
      default:
        left = host.left + ((host.width - self.width) / 2);
    }

    // assign calculated position to the tooltip component
    this.posTop = top;
    this.posLeft = left;
  }

  private onClipboardEvent($event: ClipboardEvent) {
    if (this.isClipboard) {
      $event.preventDefault();

      // if html mode is on - copy to clipboard text without tags
      const textForClipboard = this.isHTML ? this.tooltipTextSpan.nativeElement.innerText : this.text;
      $event.clipboardData.setData('text/plain', textForClipboard);
      this.messageService.showSuccessMessage('clipboard.text_copied');
    }
  }
}
