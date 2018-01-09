// TODO: remove in favor to IMarket from markets.service.ts
declare namespace cad {
  interface IMarket {
    name: string;
    isoCode: string;
    permission: string;
  }
}
