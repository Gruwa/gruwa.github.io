/* tslint:disable:no-string-literal */
window['jQuery'] = require('jquery');

// require external libraries
window['_'] = require('lodash');
window['moment'] = require('moment-timezone');
require('crypto-js/sha1');

require('angular');

require('angular-translate');
require('angular-ui-router');
require('ui-router-extras');
require('angular-animate');
require('angular-resource');
require('angular-messages');

require('angular-ui-switch/angular-ui-switch');

require('bootstrap');
require('bootstrap/dist/css/bootstrap.css');

require('angular-ui-bootstrap');
require('angular-filter');

require('ng-file-upload');

require('eonasdan-bootstrap-datetimepicker');

require('bootstrap-daterangepicker');
require('imports-loader?$=jquery!angular-daterangepicker/js/angular-daterangepicker');

window['Highcharts'] = require('highcharts');
require('highcharts/highcharts-more')(window['Highcharts']);
require('highcharts/js/modules/exporting')(window['Highcharts']);
require('highcharts-ng');

require('angular-sanitize');
require('ng-infinite-scroll/build/ng-infinite-scroll');

require('ng-fab-forms');
require('ngstorage/ngStorage');

require('imports-loader?require=>false!angular-websocket');
require('angulartics');
require('angulartics-google-tag-manager');

require('angular-ui-grid/ui-grid');
require('angular-ui-grid/ui-grid.css');

require('angular-vs-repeat');

require('angular-drag-and-drop-lists/angular-drag-and-drop-lists.js');

require('select2/dist/css/select2.css');
require('select2/dist/js/select2.full');

require('blockadblock');

require('ng-device-detector');

require('smoothscroll-polyfill').polyfill();

window['s2'] = {};
window['s2'].Utils = jQuery.fn.select2.amd.require('select2/utils');
window['s2'].DropdownAdapter = jQuery.fn.select2.amd.require('select2/dropdown');
window['s2'].AttachContainer = jQuery.fn.select2.amd.require('select2/dropdown/attachContainer');
window['s2'].DropdownSearch = jQuery.fn.select2.amd.require('select2/dropdown/search');
window['s2'].CloseOnSelect = jQuery.fn.select2.amd.require('select2/dropdown/closeOnSelect');
