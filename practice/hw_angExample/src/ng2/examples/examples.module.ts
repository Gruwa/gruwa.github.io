import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {ExamplesComponent} from './';
import {UnityCommonComponentsModule} from '../common/components/components.module';
import {UnityCommonDirectivesModule} from '../common/directives/directives.module';
import {UnityCommonServicesModule} from '../common/services/services.module';
import {UnityCommonPipesModule} from '../common/pipes/pipes.module';
import {UnityDateModule} from '../date/date.module';
import {UnityNumberModule} from '../number/number.module';
import {UnityCurrencyModule} from '../currency/currency.module';
import {UnityCommonValidatorsModule} from '../common/validators/validators.module';
import {UnityTimezoneModule} from '../timezone/timezone.module';
import {UnityCommonWidgetsModule} from '../common/widgets/widgets.module';
import {UnitySmartFilterModule} from '../smart-filter/smart-filter.module';
import {UnityUploadModule} from '../upload/upload.module';

import {ExamplesButtonComponent} from '../common/components/button/examples/examples-button.component';
import {
  ExamplesButtonToggleComponent
} from '../common/components/button-toggle/examples/examples-button-toggle.component';
import {ExamplesIconComponent} from '../common/components/icon/examples/examples-icon.component';
import {ExamplesLinkComponent} from '../common/components/link/examples/examples-link.component';
import {ExamplesChipComponent} from '../common/components/chip/examples/examples-chip.component';
import {ExamplesPanelComponent} from '../common/components/panel/examples/examples-panel.component';
import {ExamplesCommonPipesComponent} from '../common/pipes/examples/examples-pipe.component';
import {ExamplesDatePipesComponent} from '../date/pipes/examples/examples-date-pipes.component';
import {ExamplesNumberPipesComponent} from '../number/pipes/examples/examples-number-pipes.component';
import {ExamplesCurrencyPipesComponent} from '../currency/pipes/examples/examples-currency-pipes.component';
import {ExamplesSmartTooltipComponent} from '../common/components/smart-tooltip/examples/examples-tooltip.component';
import {ExamplesDropdownComponent} from '../common/components/dropdown/examples/examples-dropdown.component';
import {ExamplesToggleComponent} from '../common/components/toggle/examples/examples-toggle.component';
import {ExamplesSelectComponent} from '../common/components/select/examples/examples-select.component';
import {ExamplesCheckboxComponent} from '../common/components/checkbox/examples/examples-checkbox.component';
import {ExamplesRadioButtonComponent} from '../common/components/radio-button/examples/examples-radio-button.component';
import {
  ExamplesTrackChangesComponent
} from '../common/directives/track-changes/examples/examples-track-changes.component';
import {
  ExamplesSmartSearchListComponent
} from '../common/widgets/smart-search-list/examples/examples-smart-search-list.component';
import {ExamplesSearchInputComponent} from '../common/components/search-input/examples/examples-search-input.component';
import {ExamplesInlineInputComponent} from '../common/components/inline-input/examples/examples-inline-input.component';
import {ExamplesStickyComponent} from '../common/directives/sticky/examples/examples-sticky.component';
import {ExamplesPaginationComponent} from '../common/components/pagination/examples/examples-pagination.component';
import {ExamplesTileComponent} from '../common/components/tile/examples/examples-tile.component';
import {ExamplesTileIconComponent} from '../common/components/tile-icon/examples/examples-tile-icon.component';
import {ExamplesStatusComponent} from '../common/components/status/examples/examples-status.component';
import {ExamplesTimezoneComponent} from '../timezone/components/timezone/examples/examples.timezone.component';
import {ExamplesTagsComponent} from '../common/components/tags/examples/examples-tags.component';
import {ExamplesInputGroupComponent} from '../common/components/input-group/examples/examples-input-group.component';
import {ExamplesNoDataComponent} from '../common/components/no-data/examples/examples-no-data.component';
import {ExamplesSpinnerComponent} from '../common/components/spinner/examples/examples-spinner.component';
import {
  ExamplesSmartFilterComponent, ExamplesSmartFilterInputComponent
} from '../smart-filter/examples';
import {ExamplesMessageComponent} from '../message/examples/examples-message.component';
import {
  ExamplesPasswordInputComponent
} from '../common/components/password-input/examples/examples-password-input.component';
import {UnityCommonFormattersModule} from '../common/formatters/formatters.module';
import {
  ExamplesNumberFormatterDirective
} from '../common/formatters/number/examples/examples-number-formatter.directive';
import {ExamplesUploadComponent} from '../upload/examples/examples-upload.component';
import {
  ExamplesStickyHeaderComponent,
  ExamplesStickyHeaderDocsComponent
} from '../common/components/sticky-header/examples/examples-sticky-header.component';
import {
  ExamplesValidationErrorsComponent
} from '../common/components/validation-errors/exampes/examples-validation-errors.component';
import {
  ExamplesSortArrowComponent
} from '../common/components/sort-arrow/examples/sort-arrow-example.component';
import {
  ExamplesScrollToTopComponent
} from '../common/components/scroll-to-top/examples/scroll-to-top-example.component';
import {ExamplesDatepickerComponent} from '../date/components/examples/examples-datepicker.component';
import {ExamplesDateRangePickerComponent} from '../date/components/examples/examples-date-range-picker.component';
import {} from '';
import {
  ExamplesContextMenuComponent
} from '../common/widgets/context-menu/examples/examples-context-menu.component';
import {UnityModalWindowModule} from '../modal-window/modal-window.module';
import {ExamplesModalWindowComponent} from '../modal-window/examples/examples-modal-window.component';
import {ExamplesModalContentComponent} from '../modal-window/examples/test-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UnityDateModule,
    UnityNumberModule,
    UnityCurrencyModule,
    UnityCommonComponentsModule,
    UnityCommonDirectivesModule,
    UnityCommonServicesModule,
    UnityCommonPipesModule,
    UnityCommonValidatorsModule,
    UnityCommonFormattersModule,
    UnityTimezoneModule,
    UnityCommonWidgetsModule,
    UnitySmartFilterModule,
    UnityUploadModule,
    UnityModalWindowModule
  ],
  declarations: [
    ExamplesComponent,
    ExamplesButtonComponent,
    ExamplesButtonToggleComponent,
    ExamplesIconComponent,
    ExamplesLinkComponent,
    ExamplesChipComponent,
    ExamplesPanelComponent,
    ExamplesDropdownComponent,
    ExamplesToggleComponent,
    ExamplesCommonPipesComponent,
    ExamplesDatePipesComponent,
    ExamplesNumberPipesComponent,
    ExamplesCurrencyPipesComponent,
    ExamplesSmartTooltipComponent,
    ExamplesSelectComponent,
    ExamplesCheckboxComponent,
    ExamplesRadioButtonComponent,
    ExamplesTrackChangesComponent,
    ExamplesNumberFormatterDirective,
    ExamplesSmartSearchListComponent,
    ExamplesSearchInputComponent,
    ExamplesInlineInputComponent,
    ExamplesStickyComponent,
    ExamplesPaginationComponent,
    ExamplesTileComponent,
    ExamplesTileIconComponent,
    ExamplesStatusComponent,
    ExamplesTimezoneComponent,
    ExamplesTagsComponent,
    ExamplesInputGroupComponent,
    ExamplesNoDataComponent,
    ExamplesSpinnerComponent,
    ExamplesSmartFilterComponent,
    ExamplesSmartFilterInputComponent,
    ExamplesMessageComponent,
    ExamplesPasswordInputComponent,
    ExamplesUploadComponent,
    ExamplesStickyHeaderComponent,
    ExamplesStickyHeaderDocsComponent,
    ExamplesSortArrowComponent,
    ExamplesScrollToTopComponent,
    ExamplesValidationErrorsComponent,
    ExamplesDatepickerComponent,
    ExamplesDateRangePickerComponent,
    ExamplesContextMenuComponent,
    ExamplesModalWindowComponent,
    ExamplesModalContentComponent
  ],
  exports: [
    ExamplesModalWindowComponent,
    ExamplesModalContentComponent
  ],
  entryComponents: [
    ExamplesComponent,
    ExamplesModalContentComponent
  ]
})
export class UnityExamplesModule {}
