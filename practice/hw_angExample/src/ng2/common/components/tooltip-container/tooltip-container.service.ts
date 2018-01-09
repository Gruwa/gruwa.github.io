import * as _ from 'lodash';
import {ComponentRef, Injectable, ViewContainerRef} from '@angular/core';
import {TooltipComponent} from '../smart-tooltip/tooltip.component';

/**
 * This service provides reference to the view of <cad-tooltip-container> located in ng1 template
 */
@Injectable()
export class TooltipContainerService {
  view: ViewContainerRef;
  updateView: Function;
  private tooltips: ComponentRef<TooltipComponent>[] = [];

  addToVisibleList(tooltip: ComponentRef<TooltipComponent>) {
    this.tooltips.push(tooltip);
  }

  removeFromVisibleList(tooltip: ComponentRef<TooltipComponent>) {
    _.pull(this.tooltips, tooltip);
  }

  // method to hide all visible tooltips on demand from any place
  destroyVisibleTooltips() {
    this.tooltips.forEach(tooltip => tooltip.destroy());
    this.tooltips = [];
  }
}
