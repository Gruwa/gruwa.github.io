import {NgModule} from '@angular/core';
import {ShiftsComponent} from './shifts.component';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AppComponentsModule} from '../shared/components/app-components.module';
import {HeaderShiftsComponent} from '../shared/components/header-shifts/header-shifts.component';
import {ContentShiftsComponent} from './content-shifts/content-shifts.component';
import {HttpClientModule} from '@angular/common/http';
import {DetailsShiftsComponent} from './details-shifts/details-shifts.component';

export const routes: Routes = [
  {
    path: 'shifts',
    component: ShiftsComponent,
    pathMatch: 'full'
  },
  {
    path: 'shifts/:id',
    component: DetailsShiftsComponent,
  },
  {
    path: '',
    redirectTo: '/404',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/404'
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AppComponentsModule
  ],
  declarations: [
    ShiftsComponent,
    HeaderShiftsComponent,
    ContentShiftsComponent,
    DetailsShiftsComponent
  ],
  providers: []
})
export class ShiftsModule {
}
