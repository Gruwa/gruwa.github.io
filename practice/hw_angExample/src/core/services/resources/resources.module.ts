import configModule from '../config/config.module';

import {ReflectiveInjector} from '@angular/core';

import {AdvertisersResource} from './advertisers/advertiser.resource';
import {AdvertisersService} from './advertisers/advertisers.service';
import {AgenciesService} from './agencies/agencies.service';
import industryCategoriesService from './industry-categories/industry-categories.service';
import industryCategoriesResource from './industry-categories/industry-categories.resource';
import {MarketsService} from './markets/markets.service';
import {RolesService} from './roles/roles.service';
import {UsersService} from './users/users.service';
import {UsersResource} from './users/users.resource';
import {ConfigService} from '../../../ng2/common/services/config/config.service';

import {WindowService} from '../../../ng2/common/services/window/window.service';

const dependencies = [
  'ui.router', // for $urlRouterProvider in specs
  'ngResource',
  'angulartics',
  'angulartics.google.tagmanager',
  configModule.name
];
const ngModule = angular.module('cadreon.core.services.resources', dependencies);

ngModule.factory('Advertiser', AdvertisersResource);
ngModule.service('advertisersService', AdvertisersService);
industryCategoriesService(ngModule);
industryCategoriesResource(ngModule);
ngModule.service('marketsService', MarketsService);
ngModule.service('usersService', UsersService);
ngModule.factory('User', UsersResource);

ngModule.factory('rolesService', ($injector => {
  'ngInject';

  // TODO: ReflectiveInjector got deprecated in ng5 so either find replacement for it or migrate its usages to ng5
  const injector = ReflectiveInjector.resolveAndCreate([
    RolesService,
    ConfigService,
    { provide: WindowService, useValue: window},
    { provide: '$cacheFactory', useValue: $injector.get('$cacheFactory') },
    { provide: '$http', useValue: $injector.get('$http') }
  ]);
  return injector.get(RolesService);
}));

ngModule.factory('marketsService', ($injector => {
  'ngInject';

  const injector = ReflectiveInjector.resolveAndCreate([
    MarketsService,
    RolesService,
    ConfigService,
    { provide: WindowService, useValue: window},
    { provide: '$cacheFactory', useValue: $injector.get('$cacheFactory') },
    { provide: '$http', useValue: $injector.get('$http') }
  ]);
  return injector.get(MarketsService);
}));

ngModule.factory('agenciesService', ($injector => {
  'ngInject';

  const injector = ReflectiveInjector.resolveAndCreate([
    AgenciesService,
    { provide: '$http', useValue: $injector.get('$http') }
  ]);
  return injector.get(AgenciesService);
}));

export default ngModule;
