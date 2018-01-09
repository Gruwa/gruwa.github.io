declare namespace cad {
  interface IFilterService extends ng.IFilterService {
    (name: 'cadDateTZ'): {
      (input: Date | number | string, type?: string): string;
    };
  }
}
