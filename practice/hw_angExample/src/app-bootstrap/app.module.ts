import './app.trackers';
import {downgradeComponent} from '@angular/upgrade/static';
import unityCoreModule from '../core/core.module';
import {appGeneralConfig} from './app.general.config';
import {appRoutesConfig} from './app.routes.config';
import {appGeneralInit, appStateChangeWatchersInit} from './app.init';
import {DevLoginComponent} from '../ng2/dev-login/dev-login.component';
import {MainViewComponent} from '../ng2/header';

let ngModule = angular.module('cadreon', [
  'ui.router',
  'ct.ui.router.extras.previous',
  'pascalprecht.translate',
  'uiSwitch',
  'ui.bootstrap',
  'ui.grid',
  'ui.grid.resizeColumns',
  'ui.grid.pinning',
  'ui.grid.pagination',
  'angular.filter',
  'ngAnimate',
  'ngFileUpload',
  'daterangepicker',
  'highcharts-ng',
  'ngSanitize',
  'infinite-scroll',
  'angular-websocket',
  'dndLists',
  unityCoreModule.name,
  'cadreon.abstractApp',
  'ng.deviceDetector'
])
.config(appGeneralConfig)
.config(appRoutesConfig)
.run(appGeneralInit)
.run(appStateChangeWatchersInit);

const ngxComponents = <any> [
  ['cadNgxDevLogin', DevLoginComponent],
  ['cadNgxMainView', MainViewComponent]
];
_.map(ngxComponents, ([name, component]) =>  ngModule.directive(name, downgradeComponent({component})));

// don't trigger "scroll" events very frequently as this hurts performance
angular.module('infinite-scroll').value('THROTTLE_MILLISECONDS', 500);

export default ngModule;
