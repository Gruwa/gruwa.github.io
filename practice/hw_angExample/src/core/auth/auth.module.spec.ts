import '../date/date.module.spec';

import ngModule from './auth.module';

import authInterceptorSpec from './interceptors/auth.interceptor.spec';
import urlInterceptorSpec from './interceptors/url.interceptor.spec';
import authServiceSpec from './services/auth.service.spec';
import currentUserServiceSpec from './services/current-user.service.spec';
import cadHasPermissionsSpec from './filters/has-permissions.filter.spec';
import cadAllowedForMarketsSpec from './filters/allowed-for-markerts.filter.spec';
import menuPlusControllerSpec from './components/menu/plus/menu-plus.controller.spec';

authInterceptorSpec(ngModule);
urlInterceptorSpec(ngModule);
authServiceSpec(ngModule);
currentUserServiceSpec(ngModule);
cadHasPermissionsSpec(ngModule);
cadAllowedForMarketsSpec(ngModule);
menuPlusControllerSpec(ngModule);

export default ngModule;
