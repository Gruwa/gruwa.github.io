declare namespace cad {
  interface IFilterService extends ng.IFilterService {
    (name: 'cadNumber'): {
      (input: number|string, fractionSize?: number): string;
    };
  }
}
