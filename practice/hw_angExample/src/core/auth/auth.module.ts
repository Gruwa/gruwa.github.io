import {downgradeComponent} from '@angular/upgrade/static';

import servicesModule from '../services/services.module';
import configModule from '../services/config/config.module';
import dateModule from '../date';
import timezoneModule from '../timezone';

import {authInterceptorFactory} from './interceptors/auth.interceptor';
import {UrlInterceptorProvider} from './interceptors/url.interceptor';

import {AuthService} from './services/auth.service';
import {CurrentUserService} from './services/current-user.service';

import {CadHasPermissions, AllowedForMarkets, CadDateTZ} from './';

import menuPlusDirective from './components/menu/plus/menu-plus.directive';
import menuDropdownDirective from './components/menu/dropdown/menu-dropdown.directive';
import menuTabsDirective from './components/menu/tabs/menu-tabs.directive';
import hasRolesDirective from './components/roles/has-roles.directive';
import {ForbiddenPageComponent} from '../../ng2/auth';

const dependencies = [
  'ui.router',
  'ngStorage',
  'ui.bootstrap',
  'ct.ui.router.extras.previous',
  timezoneModule.name,
  servicesModule.name,
  configModule.name,
  dateModule.name
];
const ngModule = angular.module('cadreon.core.auth', dependencies);

ngModule.factory('authInterceptor', authInterceptorFactory);
ngModule.provider('urlInterceptor', UrlInterceptorProvider);

ngModule.service('authService', AuthService);
ngModule.service('currentUserService', CurrentUserService);

ngModule.filter('cadHasPermissions', CadHasPermissions);
ngModule.filter('cadAllowedForMarkets', AllowedForMarkets);
ngModule.filter('cadDateTZ', CadDateTZ);

menuPlusDirective(ngModule);
menuDropdownDirective(ngModule);
menuTabsDirective(ngModule);
hasRolesDirective(ngModule);

ngModule.directive('cadNgxForbiddenPage', downgradeComponent({
  component: ForbiddenPageComponent
}));

export default ngModule;
