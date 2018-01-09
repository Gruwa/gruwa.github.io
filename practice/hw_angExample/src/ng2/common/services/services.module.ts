import {NgModule} from '@angular/core';
import {ConfigService} from './';
import {WindowService} from './';
import {AppService} from './';
import {StorageService} from './';
import {LoggerService} from './';
import {GlobalEventsService} from './';
import {AdminPagesService} from './';
import {PermissionsService} from './';
import {RolesService} from './';
import {MarketsService} from './';
import {AgenciesService} from './';

@NgModule({
  providers: [
    ConfigService,
    AppService,
    AdminPagesService,
    StorageService,
    LoggerService,
    GlobalEventsService,
    RolesService,
    MarketsService,
    AgenciesService,
    PermissionsService,
    {provide: WindowService, useValue: window}
  ]
})
export class UnityCommonServicesModule {}
