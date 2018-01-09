declare namespace cad {
  interface IUnityApp {
    name: string; // kind of app ID
    title: string;
    permissions: string[];
    roleUrl: string; // looks unused
    marketUrl: string; // looks unused
    baseUrl: string;
    entryUrl: string; // string to navigate to open app
    hasMultipleMarkets?: boolean; // looks unused
    statePattern: RegExp;
    path: string; // directory where this app located on server
  }
}
