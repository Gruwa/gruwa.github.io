export function CadPercentage($filter: ng.IFilterService) {
  'ngInject';

  return (input: number, decimalPlaces = 0): string => {
    input = Number(input) || 0;

    if (input !== 0) {
      input = input * 100;
    }

    return $filter('number')(input, decimalPlaces) + '%';
  };

}
