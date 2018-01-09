import {CurrentUserService} from '../services/current-user.service';

export function AllowedForMarkets(currentUserService: CurrentUserService) {
  'ngInject';

  return (requiredMarkets: string[]): boolean => {
    return currentUserService.isActiveMarketWithin(requiredMarkets);
  };
}
