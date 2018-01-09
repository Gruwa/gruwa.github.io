declare namespace cad {

  interface ILocalization {
    language: string;
    locale: any; // Need to be defined as string later
    grouping: string;
    decimal: string;
  }

  interface IUserApp {
    name: string;
    role: any;
    market: any;

    isAllAgencies: boolean;
    isAllAdvertisers: boolean;

    agencies?: any[];
    advertisers?: any[];
  }

  interface IUserCustomData {
    agencies?: any[];
    advertisers?: any[];
    localization?: {
      locale: string;
      language: string;
      grouping: string;
      decimal: string;
    };
    timezone?: string;
    defaultAppName?: string;
  }

  interface IUser extends ng.resource.IResource<IUser> {
    userName: string;
    firstName: string;
    email: string;
    fname: string;
    lname: string;
    endUser: string;
    login: string;
    password: string;
    isLocked: boolean;
    enabled: boolean;
    customData: IUserCustomData;
    market: string; // ISO code of active market at the moment
    availableMarkets: string[]; // ISO codes of all available markets
    // !!! need to get rid of cad.IMarket and use IMarket from MarketsService
    marketObj: cad.IMarket; // active market
    availableMarketsObj: cad.IMarket[]; // list of all available markets
    roleName: string; // use role text title ("admin", "campain manager", etc)
    role: any; // user management thing - used at user role dropdown
    // Todo: need to figure out what is used actualy 'role' or 'roles' and get rid of one of them
    roles: string[]; // set of user roles (actually it's permissions), comes from BE
    isSuperAdmin: boolean;
    apps: string[];
  }

  interface IUsersResource extends ng.resource.IResourceClass<IUser> {
    me(): IUser;
    update(params: Object): IUser;
    changeUserPassword(params: Object): IUser;
    changePassword(params: Object): IUser;
    resetPassword(params: Object): IUser;
    resetPasswordByUser(params: Object): IUser;
    enable(params: Object): IUser;
  }
}
