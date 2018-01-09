import 'angular-mocks';
import '../core/core.module.spec';
import ngModule from './app.module';

// add fake module to run unit tests without any real app loaded
angular.module('cadreon.abstractApp', []);

import appInit from './app.init.spec';

appInit(ngModule);

export default ngModule;
