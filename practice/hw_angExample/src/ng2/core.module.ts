import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DevLoginComponent} from './dev-login/dev-login.component';
import {UnityExamplesModule} from './examples/examples.module';
import {CadDateRangeModule} from './date-range/date-range.module';
import {UnityAuthModule} from './auth/auth.module';
import {UnityDateModule} from './date/date.module';
import {UnityNumberModule} from './number/number.module';
import {UnitySupportModule} from './support/support.module';
import {UnityCurrencyModule} from './currency/currency.module';
import {UnityTimezoneModule} from './timezone/timezone.module';
import {UnityCommonPipesModule} from './common/pipes/pipes.module';
import {UnityCommonServicesModule} from './common/services/services.module';
import {UnityCommonComponentsModule} from './common/components/components.module';
import {UnityCommonDirectivesModule} from './common/directives/directives.module';
import {UnityCommonValidatorsModule} from './common/validators/validators.module';
import {UnityCommonFormattersModule} from './common/formatters/formatters.module';
import {UnityCommonWidgetsModule} from './common/widgets/widgets.module';
import {UnityHeaderModule} from './header/header.module';
import {MessageModule} from './message/message.module';
import {UnitySmartFilterModule} from './smart-filter/smart-filter.module';
import {UnityUploadModule} from './upload/upload.module';
import {UnityModalWindowModule} from './modal-window/modal-window.module';
import {NG1_SERVICES} from './ng1.servicies';

@NgModule({
  imports: [
    CommonModule,
    MessageModule,
    UnityExamplesModule,
    UnityAuthModule,
    UnityDateModule,
    UnityNumberModule,
    UnitySupportModule,
    UnityCurrencyModule,
    UnityCommonPipesModule,
    UnityCommonServicesModule,
    UnityCommonComponentsModule,
    UnityCommonDirectivesModule,
    UnityCommonValidatorsModule,
    UnityCommonFormattersModule,
    UnityCommonWidgetsModule,
    CadDateRangeModule,
    UnityHeaderModule,
    UnityTimezoneModule,
    UnitySmartFilterModule,
    UnityUploadModule,
    UnityModalWindowModule
  ],
  providers: [
    ...NG1_SERVICES
  ],
  exports: [
    UnityAuthModule,
    UnityDateModule,
    UnityNumberModule,
    UnitySupportModule,
    UnityCurrencyModule,
    UnityCommonPipesModule,
    UnityCommonServicesModule,
    UnityCommonComponentsModule,
    UnityCommonDirectivesModule,
    UnityCommonValidatorsModule,
    UnityCommonFormattersModule,
    UnityCommonWidgetsModule,
    CadDateRangeModule,
    UnityHeaderModule,
    UnityTimezoneModule,
    UnitySmartFilterModule,
    UnityUploadModule,
    UnityModalWindowModule
  ],
  declarations: [
    DevLoginComponent
  ],
  entryComponents: [
    DevLoginComponent
  ]
})
export class CoreModule {}
