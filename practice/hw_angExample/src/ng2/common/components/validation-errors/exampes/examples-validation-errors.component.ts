import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EmailValidatorDirective} from '../../../validators/email/email-validator.directive';

@Component({
  selector: 'cad-examples-validation-errors',
  template: require('./examples-validation-errors.html')
})
export class ExamplesValidationErrorsComponent {
  isFirstOnly = true;
  isDefaultMessages = true;

  minLength = 5;
  maxLength = 15;
  patternRegExp = /^\w+$/;

  form: FormGroup;
  customMessages = new Map([
    ['minlength', `Min length should be ${this.minLength}`],
    ['maxlength', `Max length should be ${this.maxLength}`]
  ]);

  constructor(
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      inputCtrl: ['', [
        Validators.required,
        Validators.minLength(this.minLength),
        Validators.maxLength(this.maxLength),
        Validators.pattern(this.patternRegExp),
        Validators.email
      ]]
    });
  }

}
