import * as _ from 'lodash';
import {
  Component, Input, SkipSelf, OnDestroy, Optional, AfterViewInit, Inject, OnChanges, Host,
  ChangeDetectorRef
} from '@angular/core';
import {ControlContainer, FormControl} from '@angular/forms';

type DisplayStrategy = 'touched' | 'dirty' | 'touchedOrDirty' | 'touchedAndDirty';

@Component({
  selector: 'cad-validation-errors',
  template: require('./validation-errors.html'),
  styles: [require('./validation-errors.scss')]
})
export class ValidationErrorsComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() fieldName: string;
  @Input('fieldControl') control: FormControl;
  @Input() useDefaultMessages: boolean = true;
  @Input('validationMessages') customValidationMessages: Map<string, string>;
  @Input() showFirstOnly: boolean = true;
  @Input() displayStrategy: DisplayStrategy = 'touchedOrDirty';

  errors: string[];

  private alive = true;
  private defaultMessages: Map<string, string>;

  constructor(
    @Optional() @Host() @SkipSelf() private parent: ControlContainer,
    @Inject('$translate') private $translate: ng.translate.ITranslateService,
    protected changeDetector: ChangeDetectorRef
  ) {
    // use Map as we need guaranteed items order
    this.defaultMessages = new Map([
      ['required', 'validation.required'],
      ['pattern', 'validation.invalid'],
      ['email', 'validation.invalid_email'],
      ['password', 'validation.invalid_password'],
      ['date', 'validation.invalid_date'],
      ['time', 'validation.invalid_time'],
      ['datetime', 'validation.invalid_date_time'],
      ['number', 'validation.invalid_number'],
      ['color', 'validation.invalid_color'],
      ['range', 'validation.invalid_range'],
      ['month', 'validation.invalid_month'],
      ['url', 'validation.invalid_url'],
      ['file', 'validation.invalid_file'],
      ['dateIsNotAfterStartDate', `validation.date_is_not_after_start_date`],
      ['dateIsNotBefore', `validation.date_is_not_before`],
      ['dateIsNotAfter', `validation.date_is_not_after`],
      ['minlength', 'validation.does_not_meet_min_length'],
      ['maxlength', 'validation.does_not_meet_max_length'],
      ['min', `validation.less_then_min`],
      ['max', `validation.more_then_max`],
      ['numberDecimalsExceed', `validation.number_decimals_exceed`],
      ['numberIsNotGreater', `validation.less_then_min`],
      ['numberIsNotLess', `validation.more_then_max`]
    ]);
  }

  ngAfterViewInit() {
    // try to get control by name from its parent container
    if (!this.control && this.parent) {
      this.control = _.get(this.parent, `control.controls.${this.fieldName}`);
      // As view is already stabilized and we are changing input param - we need to mark that it was changed
      this.changeDetector.detectChanges();
    }

    if (!this.control) {
      throw new Error('ValidationErrorsComponent needs valid form control to work properly');
    }

    this.control.statusChanges
      .takeWhile(() => this.alive)
      .subscribe(() => this.updateErrors());

    this.updateErrors();
  }

  ngOnChanges() {
    this.updateErrors();
  }

  ngOnDestroy() {
    this.alive = false;
  }

  showErrors(): boolean {
    const baseCondition = this.control && !_.isEmpty(this.errors);

    switch (this.displayStrategy) {
      case 'touched':
        return baseCondition && this.control.touched;
      case 'dirty':
        return baseCondition && this.control.dirty;
      case 'touchedOrDirty':
        return baseCondition && (this.control.touched || this.control.dirty);
      case 'touchedAndDirty':
        return baseCondition && (this.control.touched && this.control.dirty);
      default:
        return baseCondition;
    }
  }

  private updateErrors() {
    if (!this.control) return;

    let messages = _.clone(this.defaultMessages);

    // if there are custom messages - either merge them into default or just use as-is
    if (this.customValidationMessages) {
      if (this.useDefaultMessages) {
        this.customValidationMessages.forEach((message, errorKey) => messages.set(errorKey, message));
      } else {
        messages = this.customValidationMessages;
      }
    }

    this.errors = [];
    messages.forEach((message, errorKey) => {
      const errorParams = this.control.getError(errorKey);
      if (errorParams) {
        const finalMessage = errorParams.errorMessage || message;
        this.errors.push(this.$translate.instant(finalMessage, errorParams));
      }
    });

    this.errors = this.showFirstOnly ? _.take(this.errors, 1) : this.errors;
  }
}
