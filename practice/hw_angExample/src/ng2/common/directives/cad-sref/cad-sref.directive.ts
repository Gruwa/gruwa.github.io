import { Directive, Input, Inject, OnChanges, HostListener, HostBinding } from '@angular/core';
import { IStateService, IStateOptions } from 'angular-ui-router';

interface IStateParams {
  [key: string]: any;
}

@Directive({
  selector: '[cadSref]',
  host: {class: 'cad-sref'}
})
export class CadSref implements OnChanges {
  @Input() cadSref: string;
  @Input() cadSrefParams: IStateParams;
  @Input() cadSrefOpts: IStateOptions = {};
  @Input() disabled: boolean;

  @HostBinding('attr.href') href;

  stateName: string;
  stateParams: any;

  constructor(
    @Inject('$state') private $state: IStateService
  ) {
  }

  ngOnChanges() {
    this.href = this.disabled ? null : this.$state.href(this.cadSref, this.cadSrefParams, this.cadSrefOpts);
  }

  @HostListener('click', ['$event'])
  onClick($event: Event) {
    if (this.disabled) {
      return;
    }

    $event.preventDefault();

    this.$state.go(this.cadSref, this.cadSrefParams, this.cadSrefOpts);
  }
}
