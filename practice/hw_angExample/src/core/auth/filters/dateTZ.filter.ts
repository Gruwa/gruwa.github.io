import * as moment from 'moment';
import {CurrentUserService} from '../services/current-user.service';

export function CadDateTZ($filter: cad.IFilterService, currentUserService: CurrentUserService) {
  'ngInject';

  // Assume that all dates are come to filter in UTC
  return (value, filterType) => {
    value = moment.utc(value).format();
    return $filter('cadDate')(value, filterType, _.get(currentUserService.timezone, 'offset'));
  };
}
