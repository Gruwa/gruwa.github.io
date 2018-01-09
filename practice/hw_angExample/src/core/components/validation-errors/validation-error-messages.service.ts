export interface IValidationMessage {
  name: string;
  message: string;
  priority: number;
}

export class ValidationErrorMessagesService {
  private _errors: IValidationMessage[] = require('./validation-errors.json');

  constructor() {
    'ngInject';
  }

  get errors() {
    return this._errors;
  }
}
