import {cadNoDataSymbol} from '../cadreon.const';

export function CadPercent($filter: ng.IFilterService) {
  'ngInject';

  // &mdash;
  const dash = cadNoDataSymbol;

  return (input: number, numDecimals = 2, trimZeroDecimals = true): string => {
    if (!_.isNumber(input)) {
      return dash;
    }

    // Checking if input is integer
    if (trimZeroDecimals && input % 1 === 0) {
      return $filter('number')(input, 0) + '%';
    }

    return $filter('number')(input, numDecimals) + '%';
  };
}
