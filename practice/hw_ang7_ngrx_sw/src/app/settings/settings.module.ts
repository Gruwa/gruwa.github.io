import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SettingsComponent} from './settings.component';
import {AppComponentsModule} from '../shared/components/app-components.module';
import {ReactiveFormsModule} from '@angular/forms';
import {MaterialsModule} from '../shared/components/materials/materials.module';
import {
  RouterModule,
  Routes
} from '@angular/router';
import {SettingsService} from './services/settings.service';

export const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
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
  declarations: [SettingsComponent],
  exports: [SettingsComponent],
  providers: [SettingsService]
})
export class SettingsModule {
}
