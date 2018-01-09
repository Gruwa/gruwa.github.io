import {cadNoDataSymbol} from '../../cadreon.const';

export function CadNumberShort($filter: ng.IFilterService) {
  'ngInject';

  const dash = cadNoDataSymbol;

  return (input, fractionSize, decimals) => {
    if (!_.isNumber(input)) {
      return dash;
    }

    let exp;
    let value;
    let suffixes = ['K', 'M', 'B', 'T', 'P', 'E'];

    if (isNaN(input)) {
      return null;
    }

    if (Math.abs(input) < 1000) {
      return $filter('number')(input, fractionSize);
    }

    exp = getExp(input);
    value = input / Math.pow(1000, exp);

    // check if decimal part is empty
    return (value.toFixed(decimals) % 1 === 0
        ? $filter('number')(value, 0) : $filter('number')(value, decimals)) + suffixes[exp - 1];
  };

  function getExp(num) {
    let exp = 0;

    while (Math.abs(num) > 999) {
      num = Math.round(num / 1000);
      exp++;
    }

    return exp;
  }
}
