import {Component, Input, ContentChild, AfterContentInit} from '@angular/core';
import {ISmartFilterControl} from './smart-filter-control';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'cad-smart-filter',
  template: require('./smart-filter.html'),
  styles: [require('./smart-filter.scss')]
})
export class SmartFilterComponent implements AfterContentInit {
  @Input() name: string;
  @Input() label: string;

  @ContentChild('cadSmartFilterControl')
  public filterControl: ISmartFilterControl;

  ngAfterContentInit() {
    if (!this.filterControl) {
      throw new Error(`cadSmartFilter: Unable to find control. Make sure that it is supplied as child element with '#cadSmartFilterControl' attribute.`); // tslint:disable-line
    }
  }

  clear(): void {
    this.filterControl.setValue(null);
  }

  isValid(): boolean {
    if (_.isFunction(this.filterControl.isValid)) {
      return this.filterControl.isValid();
    }

    return true;
  }

  hasSmartTooltip() {
    if (_.isNil(this.filterControl.hasSmartTooltip)) {
      return false;
    }

    return this.filterControl.hasSmartTooltip;
  }

  getNativeElement(): Element | null {
    return _.get(this, 'filterControl.elementReference.nativeElement', null);
  }

  isCleared(): boolean {
    return _.isEmpty(this.filterControl.getValue());
  }

  setValue(value: any) {
    this.filterControl.setValue(value);
  }

  getValue(): any {
    return this.filterControl.getValue();
  }

  getLabel(): string | Observable<string> {
    return this.filterControl.getLabel();
  }

  getTooltip(): string | Observable<string> {
    return this.filterControl.getTooltip();
  }
}
