import {CadNumber} from './filters/number.filter';
import {CadNumberShort} from './filters/number-short.filter';

const ngModule = angular.module('cadreon.core.number', []);

ngModule.filter('cadNumber', CadNumber);
ngModule.filter('cadNumberShort', CadNumberShort);
// Do not use nearestSuffix in ng2. Use cadNumberShort instead
ngModule.filter('nearestSuffix', CadNumberShort);

export default ngModule;
