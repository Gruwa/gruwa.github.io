import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialsModule} from '../shared/components/materials/materials.module';
import {RouterModule, Routes} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {AppComponentsModule} from '../shared/components/app-components.module';
import {AvailbilityComponent} from './availbility.component';
import {TimeoffComponent} from './timeoff/timeoff.component';
import {VolunteerComponent} from './volunteer/volunteer.component';

export const routes: Routes = [
  {
    path: '',
    component: AvailbilityComponent,
    pathMatch: 'full'
  },
  {
    path: '/timeoff',
    component: TimeoffComponent
  },
  {
    path: '/volunteer',
    component: VolunteerComponent
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
    AppComponentsModule,
    ReactiveFormsModule,
    MaterialsModule
  ],
  declarations: [
    AvailbilityComponent,
    TimeoffComponent,
    VolunteerComponent
  ],
  exports: [
    AvailbilityComponent,
    TimeoffComponent,
    VolunteerComponent
  ]
})
export class AvailbilityModule {
}
