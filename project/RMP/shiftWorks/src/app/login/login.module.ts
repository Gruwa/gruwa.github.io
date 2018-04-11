import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './login.component';
import {RouterModule, Routes} from '@angular/router';
import {AppComponentsModule} from '../shared/components/app-components.module';
import {MaterialsModule} from '../shared/components/materials/materials.module';
import {AuthService} from './services/auth.service';
import {AuthGuardService} from './services/auth.guard.service';
import {ScheduleLoginComponent} from './schedule-login/schedule-login.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'schedule',
    component: ScheduleLoginComponent,
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
  declarations: [
    LoginComponent,
    ScheduleLoginComponent
  ],
  providers: [
    AuthGuardService,
    AuthService
  ]
})

export class LoginModule {
}
