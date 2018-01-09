import * as _ from 'lodash';
import {
  Directive,
  ElementRef,
  Input,
  ComponentFactoryResolver,
  ComponentRef, ContentChild,
  TemplateRef
} from '@angular/core';
import {TooltipComponent, TooltipPlacements} from './tooltip.component';
import {TooltipContainerService} from '../tooltip-container/tooltip-container.service';

type TooltipTriggers = 'hover' | 'click';

interface ISmartTooltipOptions {
  textElemSelector: string; // selector for custom text element inside host, used in smart mode only
  placement: TooltipPlacements; // where to display tooltip
  triggerOn: TooltipTriggers; // when to show tooltip
  isEnabled: boolean; // if tooltip functionality is enabled at all
  isSmart: boolean; // to check if inner text is truncated or show tooltip without any conditions
  isHTML: boolean; // to treat tooltip text as html; html won't be compiled
  isClipboard: boolean; // to enable "copy to clipboard" feature
  customClass: string;
}

@Directive({
  selector: '[cadSmartTooltip]',
  exportAs: 'cadSmartTooltip',
  host: {
    '(document:click)': 'onClick($event)',
    '(longpress)': 'showOnHoverIn()',
    '(touchend)': 'hideOnHoverOut()',
    '(mouseenter)': 'showOnHoverIn()',
    '(mouseleave)': 'hideOnHoverOut()'
  }
})
export class SmartTooltipDirective {
  @Input('cadSmartTooltip') text: string;
  @Input('cadSmartTooltipOptions') options: ISmartTooltipOptions;
  private tooltip: ComponentRef<TooltipComponent> = null;
  private textElement: HTMLElement;
  private defaultOptions: ISmartTooltipOptions = {
    textElemSelector: '',
    placement: 'bottom',
    triggerOn: 'hover',
    isEnabled: true,
    isSmart: true,
    isHTML: false,
    isClipboard: true,
    customClass: ''
  };
  @ContentChild('customTooltipTemplate') private customTooltipTemplate: TemplateRef<any>;

  constructor(
    private tooltipContainerService: TooltipContainerService,
    private hostElement: ElementRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnInit() {
    this.updateOptions();
  }

  ngAfterViewInit() {
    // cache text element
    if (_.isEmpty(this.options.textElemSelector)) {
      this.textElement = this.hostElement.nativeElement;
    } else {
      this.textElement = this.hostElement.nativeElement.querySelector(this.options.textElemSelector);
      this.textElement = this.textElement || this.hostElement.nativeElement; // fallback if bad selector provided
    }
  }

  ngOnChanges() {
    // update internal options object on any external change
    this.updateOptions();
  }

  ngOnDestroy() {
    this.hideTooltip();
  }

  private updateOptions() {
    this.hideTooltip();
    this.options = _.merge({}, this.defaultOptions, this.options);
    if (this.tooltip) {
      this.tooltip.instance.text = this.text;
    }
  }

  private onClick($event: MouseEvent) {
    if (this.options.isEnabled && this.options.triggerOn === 'click') {
      // if clicked inside of host element - toggle tooltip, otherwise it's outside click - so hide tooltip then
      if (this.hostElement.nativeElement.contains($event.target)) {
        this.tooltip ? this.hideTooltip() : this.showTooltip();
      } else {
        this.hideTooltip();
      }
    }
  }

  private showOnHoverIn() {
    if (this.options.triggerOn === 'hover') {
      if (this.tooltip) { return; }
      if (!this.options.isEnabled) { return; }
      if (this.options.isSmart && !this.isTextTruncated()) { return; }
      this.showTooltip();
    }
  }

  private hideOnHoverOut() {
    if (this.options.triggerOn === 'hover' && this.tooltip) {
      this.hideTooltip();
    }
  }

  private showTooltip() {
    const factory = this.componentFactoryResolver.resolveComponentFactory(TooltipComponent);
    this.tooltip = this.tooltipContainerService.view.createComponent(factory);
    this.tooltip.instance.text = this.text;
    this.tooltip.instance.customTemplate = this.customTooltipTemplate;
    this.tooltip.instance.isHTML = this.options.isHTML;
    this.tooltip.instance.placement = this.options.placement;
    this.tooltip.instance.isClipboard = this.options.isClipboard;
    this.tooltip.instance.hostElement = this.hostElement.nativeElement;
    this.tooltip.instance.customClass = this.options.customClass;
    this.tooltipContainerService.updateView();
    this.tooltipContainerService.addToVisibleList(this.tooltip);
  }

  private hideTooltip() {
    if (this.tooltip) {
      this.tooltipContainerService.removeFromVisibleList(this.tooltip);
      this.tooltip.destroy();
      this.tooltip = null;
      this.tooltipContainerService.updateView();
    }
  }

  private isTextTruncated(): boolean {
    return this.textElement.scrollWidth > this.textElement.offsetWidth;
  }
}
