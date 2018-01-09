declare namespace cad {
  interface IFilterService extends ng.IFilterService {
    (name: 'itemLabel'): {
      (item: any, label: string): string;
    };
    (name: 'cadPercent'): {
      (input: number, trimZeroDecimals?: boolean, numDecimals?: number): string;
    };
    (name: 'cadPercentage'): {
      (input: number, decimalPlaces?: number): string;
    };
    (name: 'cadHasPermissions'): {
      (permission: string|string[], match?: string): boolean;
    };
    (name: 'cadAllowedForMarkets'): {
      (markets: string[]): boolean;
    };
    (name: 'cadUsername'): {
      (value: string): string;
    };
  }
}
