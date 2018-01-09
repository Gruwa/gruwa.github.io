declare namespace cad {
  interface IFilterService extends ng.IFilterService {
    (name: 'cadCurrency'): {
      (input: number, currency: string, format?: string, fractionSize?: number, decimals?: number): string;
    };
    (name: 'cadCurrencyShort'): {
      (input: number, currency: string, format?: string, fractionSize?: number, decimals?: number): string;
    };
  }
}
