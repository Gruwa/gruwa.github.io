import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ShiftBlockComponent} from './shift-block/shift-block.component';
import {MaterialsModule} from './materials/materials.module';
import {PageNotFoundComponent} from './not-found/not-found.component';
import {HeaderComponent} from './header/header.component';
import {SpinnerComponent} from './spinner/spinner.component';
import {SmallSpinnerComponent} from './small-spinner/small-spinner.component';
import {PipeModule} from '../pipes/pipe.module';
import {ReactiveFormsModule} from '@angular/forms';
import {FormInputComponent} from './app-foms/form-input/form-input.component';
import {FormDateComponent} from './app-foms/form-date/form-date.component';
import {FormSelectComponent} from './app-foms/form-select/form-select.component';
import {FormTimeComponent} from './app-foms/form-time/form-time.component';
import {MainListComponent} from './main-list/main-list.component';
import {SmallListComponent} from './small-list/small-list.component';
import {FormTextAreaComponent} from './app-foms/form-text-area/form-text-area.component';
import {PopupComponent} from './popup/popup.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialsModule,
    PipeModule.forRoot(),
    ReactiveFormsModule
  ],
  declarations: [
    ShiftBlockComponent,
    PageNotFoundComponent,
    HeaderComponent,
    SpinnerComponent,
    SmallSpinnerComponent,
    FormInputComponent,
    FormDateComponent,
    FormSelectComponent,
    FormTimeComponent,
    MainListComponent,
    SmallListComponent,
    FormTextAreaComponent,
    PopupComponent
  ],
  exports: [
    ShiftBlockComponent,
    PageNotFoundComponent,
    HeaderComponent,
    SpinnerComponent,
    SmallSpinnerComponent,
    FormInputComponent,
    FormDateComponent,
    FormSelectComponent,
    FormTimeComponent,
    MainListComponent,
    SmallListComponent,
    FormTextAreaComponent,
    PopupComponent
  ]
})
export class AppComponentsModule {
}
