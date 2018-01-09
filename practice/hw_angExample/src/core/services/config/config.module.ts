import {ConfigService} from './config.service';

const dependencies = [
  'pascalprecht.translate'
];
const ngModule = angular.module('cadreon.core.services.config', dependencies);

/**
 * -- Migrated services to ng2 --
 * We have to declare them in this way as donwngradeInjectoble doesn't work in tests
 */
ngModule.factory('configService', ($window: cad.IWindowService) => {
  'ngInject';
  return new ConfigService($window);
});

export default ngModule;
