import {cadNoDataSymbol} from '../../cadreon.const';

export function CadNumber($filter: ng.IFilterService) {
  'ngInject';

  // &mdash;
  const dash = cadNoDataSymbol;

  return (input: number, fractionSize = 0): string => {
    if (!_.isNumber(input)) {
      return dash;
    }

    return $filter('number')(input, fractionSize);
  };
}
