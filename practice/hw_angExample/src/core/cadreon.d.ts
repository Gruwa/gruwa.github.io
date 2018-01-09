declare namespace cad {
  interface IRootScopeService extends ng.IRootScopeService {
    user: cad.IUser;
    global: any;
  }

  interface IWindowService extends ng.IWindowService {
    Highcharts: Highcharts.Static;
    cadreon?: string;
  }

  interface IEntityListResponse<T> {
    content: T[];
    first: boolean;
    last: boolean;
    number: number; // tslint:disable-line
    numberOfElements: number;
    size: number;
    sort: string;
    totalElements: number;
    totalPages: number;
  }
}
