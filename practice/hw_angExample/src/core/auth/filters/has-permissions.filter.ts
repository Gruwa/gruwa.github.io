import {CurrentUserService} from '../services/current-user.service';

export function CadHasPermissions(currentUserService: CurrentUserService) {
  'ngInject';

  return (requiredPermissions: string|string[], match: string): boolean => {
    return currentUserService.hasPermissions(requiredPermissions, match);
  };
}
