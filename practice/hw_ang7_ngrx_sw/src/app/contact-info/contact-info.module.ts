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
import {FormContactInfoComponent} from './form-contact-info/form-contact-info.component';
import {PipeModule} from '../shared/pipes/pipe.module';
import {ContactInfoService} from './services/contact-info.service';

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
    MaterialsModule,
    PipeModule.forRoot()
  ],
  declarations: [
    ContactInfoComponent,
    FormContactInfoComponent
  ],
  exports: [
    ContactInfoComponent,
    FormContactInfoComponent
  ],
  providers: [ContactInfoService]
})
export class ContactInfoModule {
}
