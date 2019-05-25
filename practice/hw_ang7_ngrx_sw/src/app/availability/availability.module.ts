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
import {FormComponent} from './edit-availability/form/form.component';
import {PipeModule} from '../shared/pipes/pipe.module';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';

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
    PipeModule.forRoot(),
    AppComponentsModule,
    ReactiveFormsModule,
    MaterialsModule
  ],
  declarations: [
    AvailabilityComponent,
    EditAvailabilityComponent,
    ListAvailabilityComponent,
    FormComponent
  ],
  exports: [
    AvailabilityComponent,
    EditAvailabilityComponent,
    ListAvailabilityComponent,
    FormComponent
  ],
  providers: [
    AvailabilityService,
    {
      provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS,
      useValue: {useUtc: true},
    }
  ],
})
export class AvailabilityModule {
}
