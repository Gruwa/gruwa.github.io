import {Directive, ElementRef, Injector, Input} from '@angular/core';
import {UpgradeComponent} from '@angular/upgrade/static';

@Directive({
  selector: 'cad-ng1-router-outlet'
})
export class Ng1RouterOutletComponent extends UpgradeComponent {
  @Input() view: string;

  constructor(elementRef: ElementRef, injector: Injector) {
    super('cadRouterOutlet', elementRef, injector);
  }
}
