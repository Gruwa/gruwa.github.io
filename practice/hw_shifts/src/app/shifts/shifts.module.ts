import {NgModule} from '@angular/core';
import {ShiftsComponent} from './shifts.component';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AppComponentsModule} from '../shared/components/app-components.module';
import {ContentShiftsComponent} from './content-shifts/content-shifts.component';
import {DetailsShiftsComponent} from './details-shifts/details-shifts.component';
import {ShiftsService} from './Services/shifts.service';
import {MaterialsModule} from '../shared/components/materials/materials.module';

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
    MaterialsModule
  ],
  declarations: [
    ShiftsComponent,
    ContentShiftsComponent,
    DetailsShiftsComponent
  ],
  providers: [
    ShiftsService
  ]
})
export class ShiftsModule {
}
