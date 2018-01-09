import {Component, ViewContainerRef, ViewChild, ChangeDetectorRef, AfterViewInit, OnDestroy} from '@angular/core';
import {TooltipContainerService} from './tooltip-container.service';

@Component({
  selector: 'cad-tooltip-container',
  template: '<ng-template #placeholder></ng-template>'
})
export class TooltipContainerComponent implements AfterViewInit, OnDestroy {
  @ViewChild('placeholder', {read: ViewContainerRef}) placeholder: ViewContainerRef;
  private isDestroyed = false;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private containerService: TooltipContainerService
  ) {}

  ngAfterViewInit() {
    this.containerService.view = this.placeholder;
    this.containerService.updateView = this.updateView.bind(this);
  }

  ngOnDestroy() {
    this.isDestroyed = true;
  }

  /**
   * In hybrid app this component is being downgraded and put into ng1 template
   * Due to this it actually detaches from ng2 template where tooltip appearance is
   * initiated and we need a mechanism to update *this* view when needed
   */
  private updateView() {
    if (!this.isDestroyed) {
      this.changeDetector.detectChanges();
    }
  }
}
