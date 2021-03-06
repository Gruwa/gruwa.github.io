import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialsModule} from '../shared/components/materials/materials.module';
import {
  RouterModule,
  Routes
} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {AppComponentsModule} from '../shared/components/app-components.module';
import {AvailabilityComponent} from './availability.component';
import {EditAvailabilityComponent} from './edit-availability/edit-availability.component';
import {ListAvailabilityComponent} from './list-availability/list-availability.component';
import {AvailabilityService} from './services/availability.service';

export const routes: Routes = [
  {
    path: '',
    component: AvailabilityComponent,
    pathMatch: 'full'
  },
  {
    path: ':id',
    component: EditAvailabilityComponent
  },
  {
    path: 'new',
    component: EditAvailabilityComponent
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
    AvailabilityComponent,
    EditAvailabilityComponent,
    ListAvailabilityComponent
  ],
  exports: [
    AvailabilityComponent,
    EditAvailabilityComponent,
    ListAvailabilityComponent
  ],
  providers: [
    AvailabilityService
  ],
})
export class AvailabilityModule {
}
