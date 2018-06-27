import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContactInfoComponent} from './contact-info.component';
import {AppComponentsModule} from '../shared/components/app-components.module';
import {ReactiveFormsModule} from '@angular/forms';
import {MaterialsModule} from '../shared/components/materials/materials.module';
import {
  RouterModule,
  Routes
} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    component: ContactInfoComponent,
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
    AppComponentsModule,
    ReactiveFormsModule,
    MaterialsModule
  ],
  declarations: [ContactInfoComponent],
  exports: [ContactInfoComponent]
})
export class ContactInfoModule {
}
