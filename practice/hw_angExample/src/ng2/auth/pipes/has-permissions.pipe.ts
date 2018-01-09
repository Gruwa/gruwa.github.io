import {Pipe, PipeTransform, Inject} from '@angular/core';
import {CurrentUserService} from '../../../core/auth/services/current-user.service';

@Pipe({name: 'cadHasPermissions'})
export class HasPermissionsPipe implements PipeTransform {
  constructor(
    @Inject('currentUserService') private currentUserService: CurrentUserService
  ) {}

  transform(requiredPermissions: string | string[]): boolean {
    return this.currentUserService.hasPermissions(requiredPermissions);
  }
}
