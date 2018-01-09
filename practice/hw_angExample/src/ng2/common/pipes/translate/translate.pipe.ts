import {Pipe, PipeTransform, Inject} from '@angular/core';

@Pipe({name: 'translate'})
export class TranslatePipe implements PipeTransform {
  constructor(
    @Inject('$translate') private $translate: ng.translate.ITranslateService
  ) {}

  transform(value: string, interpolateParams?: any): string {
    return this.$translate.instant(value, interpolateParams);
  }
}
