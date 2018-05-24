import {NgModule} from '@angular/core';
import {ShiftsComponent} from './shifts.component';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AppComponentsModule} from '../shared/components/app-components.module';
import {ContentShiftsComponent} from './content-shifts/content-shifts.component';
import {DetailsShiftsComponent} from './details-shifts/details-shifts.component';
import {ShiftsService} from './services/shifts.service';
import {MaterialsModule} from '../shared/components/materials/materials.module';
import {FormComponent} from './details-shifts/form/form.component';
import {ReactiveFormsModule} from '@angular/forms';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'shifts',
    pathMatch: 'full'
  },
  {
    path: 'shifts',
    component: ShiftsComponent,
    pathMatch: 'full'
  },
  {
    path: 'shifts/:id',
    component: DetailsShiftsComponent
  },
  {
    path: '**',
    component: ShiftsComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AppComponentsModule,
    MaterialsModule,
    ReactiveFormsModule
  ],
  declarations: [
    ShiftsComponent,
    ContentShiftsComponent,
    DetailsShiftsComponent,
    FormComponent
  ],
  providers: [
    ShiftsService
  ]
})
export class ShiftsModule {
}
