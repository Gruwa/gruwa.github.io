import {downgradeInjectable} from '@angular/upgrade/static';

import resourcesModule from './resources/resources.module';
import configModule from './config/config.module';
import {AppService} from './app/app.service';
import {AdminPagesService} from './admin-pages/admin-pages.service';
import {UrlParamsBrokerService} from './url-params-broker/url-params-broker.service';
import {AdBlockService} from './ad-block/ad-block.service';
import {ClipboardService} from './clipboard/clipboard.service';
import {LocaleService} from './locale/locale.service';
import {StorageService} from './storage/storage.service';
import {InsightsService} from './insights/insights.service';

import {ConfigService} from '../../ng2/common/services/config/config.service';
import {MessageService, SystemToastMessageService} from '../../ng2/message/';
import {AlertListService} from '../../ng2/message/alerts/alerts-list.service';
import {NotificationsService} from './../../ng2/header/notifications/notifications.service';
import {TrackChangesService} from '../../ng2/common/directives/track-changes/track-changes.service';
import {CurrentUserService} from '../auth/services/current-user.service';

const dependencies = [
  'ui.router',
  'pascalprecht.translate',
  'ngResource',
  'ui.bootstrap',
  resourcesModule.name,
  configModule.name
];
const ngModule = angular.module('cadreon.core.services', dependencies);

/**
 * -- Migrated services to ng2 --
 * We have to declare them in this way as donwngradeInjectoble doesn't work in tests
 */
ngModule.factory('storageService', ($window: cad.IWindowService) => {
  'ngInject';
  return new StorageService($window);
});
ngModule.factory('appService', ($translate: ng.translate.ITranslateService, configService: ConfigService) => {
  'ngInject';
  return new AppService($translate, configService);
});
ngModule.factory('adminPagesService', (
  configService: ConfigService,
  currentUserService: CurrentUserService
) => {
  'ngInject';
  return new AdminPagesService(configService, currentUserService);
});

ngModule.factory('messageService', downgradeInjectable(MessageService));
ngModule.factory('systemToastMessageService', downgradeInjectable(SystemToastMessageService));
ngModule.factory('systemMessageService', downgradeInjectable(AlertListService));
ngModule.factory('notificationsService', downgradeInjectable(NotificationsService));
ngModule.factory('trackChangesService', downgradeInjectable(TrackChangesService));

/**
 * End Migrated services to ng2
 */

ngModule.service('urlParamsBrokerService', UrlParamsBrokerService);
ngModule.service('adBlockService', AdBlockService);
ngModule.service('clipboardService', ClipboardService);
ngModule.service('localeService', LocaleService);
ngModule.service('insightsService', InsightsService);

export default ngModule;
