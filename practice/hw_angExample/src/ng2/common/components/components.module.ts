import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {UnityCommonDirectivesModule} from '../directives/directives.module';
import {UnityCommonPipesModule} from '../pipes/pipes.module';

import {IconComponent} from './';
import {ButtonComponent} from './';
import {LinkComponent} from './';
import {ChipComponent} from './';
import {PanelComponent} from './';
import {DropdownComponent} from './';
import {SmartTooltipDirective} from './';
import {TooltipComponent} from './';
import {TooltipContainerComponent} from './';
import {TooltipContainerService} from './';
import {SelectComponent} from './';
import {ToggleComponent} from './';
import {CheckboxComponent} from './';
import {ButtonToggleGroupComponent} from './';
import {ButtonToggleComponent} from './';
import {RadioButtonComponent} from './';
import {RadioButtonGroupComponent} from './';
import {SearchInputComponent} from './';
import {InlineInputComponent} from './';
import {PaginationComponent} from './';
import {TileComponent} from './';
import {TileIconComponent} from './';
import {StatusComponent} from './';
import {TagsComponent} from './';
import {InputGroupComponent} from './';
import {NoDataComponent} from './';
import {SpinnerComponent} from './';
import {SortArrowComponent} from './';
import {ScrollToTopComponent} from './';
import {PasswordInputComponent} from './';
import {StickyHeaderComponent, StickySubheaderComponent} from './';
import {ValidationErrorsComponent} from './';
import {MonthCalendarComponent} from './';
import {TimeInputComponent} from './';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    UnityCommonDirectivesModule,
    UnityCommonPipesModule
  ],
  declarations: [
    IconComponent,
    ButtonComponent,
    ButtonToggleComponent,
    ButtonToggleGroupComponent,
    LinkComponent,
    ChipComponent,
    PanelComponent,
    DropdownComponent,
    ToggleComponent,
    SmartTooltipDirective,
    TooltipContainerComponent,
    TooltipComponent, // for internal usage by cadSmartTooltip, no need to export it
    SelectComponent,
    CheckboxComponent,
    RadioButtonGroupComponent,
    RadioButtonComponent,
    ScrollToTopComponent,
    SearchInputComponent,
    InlineInputComponent,
    PaginationComponent,
    TileComponent,
    TileIconComponent,
    StatusComponent,
    TagsComponent,
    InputGroupComponent,
    NoDataComponent,
    SortArrowComponent,
    SpinnerComponent,
    PasswordInputComponent,
    StickyHeaderComponent,
    StickySubheaderComponent,
    ValidationErrorsComponent,
    MonthCalendarComponent,
    TimeInputComponent
  ],
  exports: [
    ButtonComponent,
    ButtonToggleComponent,
    ButtonToggleGroupComponent,
    IconComponent,
    LinkComponent,
    ChipComponent,
    PanelComponent,
    DropdownComponent,
    ToggleComponent,
    SmartTooltipDirective,
    TooltipContainerComponent,
    SelectComponent,
    CheckboxComponent,
    RadioButtonGroupComponent,
    RadioButtonComponent,
    ScrollToTopComponent,
    SearchInputComponent,
    InlineInputComponent,
    PaginationComponent,
    TileComponent,
    TileIconComponent,
    StatusComponent,
    TagsComponent,
    InputGroupComponent,
    NoDataComponent,
    SortArrowComponent,
    SpinnerComponent,
    PasswordInputComponent,
    StickyHeaderComponent,
    StickySubheaderComponent,
    ValidationErrorsComponent,
    MonthCalendarComponent,
    TimeInputComponent
  ],
  // TODO: move downgraded components to "exports: [...]" when they no longer used in angular1 templates
  entryComponents: [
    PasswordInputComponent,
    PaginationComponent,
    TooltipContainerComponent,
    // components to be created in runtime with resolveComponentFactory() must be declared in this section
    TooltipComponent,
    NoDataComponent,
    SortArrowComponent
  ],
  providers: [
    TooltipContainerService
  ]
})
export class UnityCommonComponentsModule {}
