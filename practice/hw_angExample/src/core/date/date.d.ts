declare namespace cad {
  interface IFilterService extends ng.IFilterService {
    (name: 'cadDate'): {
      (input: Date | number | string, type?: string, timezone?: string): string;
    };
  }
}
