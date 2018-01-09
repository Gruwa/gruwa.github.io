export const NG1_SERVICES = [
  '$translate',
  '$locale',
  'messageService',
  'authService',
  'usersService',
  'currentUserService',
  'localeService',
  'urlParamsBrokerService',
  'advertisersService',
  '$rootScope',
  '$uibModal',
  '$state',
  '$stateParams',
  '$previousState',
  '$cacheFactory',
  '$filter',
  '$http',
  '$q',
  '$timeout',
  '$analytics',
  'httpErrorHandler',
  'Upload'
].map(upgradeNg1Service);

export function upgradeNg1Service(ng1ServiceName) {
  return {
    provide: ng1ServiceName, // name how ng1 dependency will appear in ng2 world
    useFactory: ($injector: ng.auto.IInjectorService) => $injector.get(ng1ServiceName), // dependency name in ng1 world
    deps: ['$injector']
  };
}
