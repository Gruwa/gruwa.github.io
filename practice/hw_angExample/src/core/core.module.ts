import {downgradeInjectable} from '@angular/upgrade/static';
import {ILocale} from './services/locale/locale.service';
require('./core.scss');
require('./components/modal/modal.html');
require('!!../config/configurations/cad-svg-loader!./assets/svg-icons/dest/sprite.svg');

import auditTrailModule from './audit-trail';
import dateRangeModule from './date-range';
import timezoneModule from './timezone';
import validationModule from './validation/validation.module';
import currencyModule from './currency';
import authModule from './auth';
import componentsModule from './components/components.module';
import servicesModule from './services/services.module';
import filtersModule from './filters/filters.module';
import {HttpErrorHandler} from './utils/http-error-handler';
import {GlobalEventsService} from '../ng2/common/services/global-events/global-events.service';

const dependencies = [
  auditTrailModule.name,
  timezoneModule.name,
  dateRangeModule.name,
  currencyModule.name,
  validationModule.name,
  componentsModule.name,
  servicesModule.name,
  filtersModule.name,
  authModule.name
];

function loadTranslations($translateProvider) {
  'ngInject';

  $translateProvider.useMissingTranslationHandler('cadMissingTranslationHandlerFactory');

  const locales: ILocale[] = require('./services/locale/locales.json');
  const whitelabelTranslations = require('../../tmp/whitelabel/current/i18n.json');

  _.each(locales, (locale: ILocale) => {
    try {
      const coreTranslations = require('./i18n/' + locale.id);

      $translateProvider.translations(locale.id, _.merge(coreTranslations, whitelabelTranslations[locale.id]));
    } catch (e) {
      //
    }
  });
}

// Adding fallback to missing key in translation, as in native code translate.angular
// try interpolate translation key in case of it absence
// This version just return translationID without any manipulation
function MissingTranslationHandlerFactory() {
  return (translationID, interpolateParams) => translationID;
}

export default angular
  .module('cadreon.core', dependencies)
  .factory('cadMissingTranslationHandlerFactory', MissingTranslationHandlerFactory)

  // ng2 communication service
  // have to use donwngradeInjectoble() to have single version of the service for ng1 and for ng2 apps
  .factory('globalEventsService', downgradeInjectable(GlobalEventsService))
  .service('httpErrorHandler', HttpErrorHandler)
  .config(loadTranslations);
