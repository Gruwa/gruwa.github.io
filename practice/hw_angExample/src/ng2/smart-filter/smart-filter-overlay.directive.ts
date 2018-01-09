import {Directive, Renderer2, Inject, Input} from '@angular/core';
import {WindowService} from '../common/services/window/window.service';

@Directive({
  selector: '[cadSmartFilterOverlay]'
})
export class SmartFilterOverlayDirective {
  overlay: HTMLDivElement;

  @Input('cadSmartFilterOverlay')
  set visible(value: boolean) {
    if (value && !this.overlay) {
      this.init();
    }

    if (value) {
      this.show();
    } else {
      this.hide();
    }
  }

  constructor(
    private renderer: Renderer2,
    @Inject(WindowService) private $window: Window
  ) {}

  private init() {
    this.overlay = this.renderer.createElement('div');
    this.renderer.setStyle(this.overlay, 'position', 'fixed');
    this.renderer.setStyle(this.overlay, 'top', 0);
    this.renderer.setStyle(this.overlay, 'right', 0);
    this.renderer.setStyle(this.overlay, 'bottom', 0);
    this.renderer.setStyle(this.overlay, 'left', 0);
    this.renderer.setStyle(this.overlay, 'z-index', 97); // 1 less than z-index for subheader
    this.renderer.setStyle(this.overlay, 'background', 'rgba(0, 0, 0, 0.7)');
  }

  private show(): void {
    if (!this.overlay) return;
    this.renderer.appendChild(this.$window.document.body, this.overlay);
  }

  private hide(): void {
    if (!this.overlay) return;
    this.renderer.removeChild(this.$window.document.body, this.overlay);
  }
}
