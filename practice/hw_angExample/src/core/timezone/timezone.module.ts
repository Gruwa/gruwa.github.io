import {TimezoneService} from './services/timezone.service';
import {TimezoneComponent} from './components/timezone.component';

const ngModule = angular.module('cadreon.core.timezone', []);

ngModule.service('timezoneService', TimezoneService);
ngModule.component('cadTimezone', TimezoneComponent);

export default ngModule;
