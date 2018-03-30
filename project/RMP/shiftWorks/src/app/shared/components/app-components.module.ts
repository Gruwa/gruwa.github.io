import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TabComponent} from './tab.component/tab.component';
import {ShiftBlockComponent} from './shift-block/shift-block.component';
import {FormComponent} from './form/form.component';
import {MaterialsModule} from './materials/materials.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialsModule
  ],
  declarations: [
    TabComponent,
    ShiftBlockComponent,
    FormComponent
  ],
  exports: [
    TabComponent,
    ShiftBlockComponent,
    FormComponent
  ]
})
export class AppComponentsModule {
}
