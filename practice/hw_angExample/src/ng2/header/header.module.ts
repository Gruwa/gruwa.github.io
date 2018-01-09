import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {UnityAuthModule} from '../auth/auth.module';
import {UnitySupportModule} from '../support/support.module';
import {UnityCommonComponentsModule} from '../common/components/components.module';
import {UnityCommonDirectivesModule} from '../common/directives/directives.module';
import {UnityCommonWidgetsModule} from '../common/widgets/widgets.module';
import {UnityCommonPipesModule} from '../common/pipes/pipes.module';
import {UnityNotificationsModule} from './';
import {SearchGlobalComponent} from './';
import {MultiMarketsTooltipComponent} from './';
import {NavigationMenuComponent} from './';
import {AboutEnvComponent, AboutEnvService} from './';
import {BackgroundProcessesModule} from './';
import {MainViewComponent} from './';
import {Ng1RouterOutletComponent} from './';
import {MainHeaderComponent, MainHeaderService} from './';
import {ProfileDropdownComponent} from './';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UnityAuthModule,
    UnitySupportModule,
    UnityNotificationsModule,
    UnityCommonComponentsModule,
    UnityCommonDirectivesModule,
    UnityCommonPipesModule,
    UnityCommonWidgetsModule,
    BackgroundProcessesModule
  ],
  declarations: [
    SearchGlobalComponent,
    MultiMarketsTooltipComponent,
    NavigationMenuComponent,
    AboutEnvComponent,
    MainViewComponent,
    Ng1RouterOutletComponent,
    MainHeaderComponent,
    ProfileDropdownComponent
  ],
  exports: [
    UnityNotificationsModule,
    BackgroundProcessesModule,
    SearchGlobalComponent,
    MultiMarketsTooltipComponent,
    NavigationMenuComponent,
    MainViewComponent,
    Ng1RouterOutletComponent,
    MainHeaderComponent,
    ProfileDropdownComponent
  ],
  providers: [
    AboutEnvService,
    MainHeaderService
  ],
  entryComponents: [
    // TODO: remove components that are no longer downgraded to ng1
    SearchGlobalComponent,
    MultiMarketsTooltipComponent,
    NavigationMenuComponent,
    MainViewComponent
  ]
})
export class UnityHeaderModule {}
