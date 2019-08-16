export interface IState {
  app: IAppState;
  // availability: IAvailabilityState,
  // contactInfo: IContactInfoState,
  // login: ILoginState, --------------
  // settings: ISettingsState,
  // shared: ISharedState,
  // shift: IShiftState,
  // sidebar: ISidebarState, ------------
}

export interface IAppState {
  dataSmallSpinner: boolean;
  dataSpinner: boolean;
  buttonAuth: boolean;
}
