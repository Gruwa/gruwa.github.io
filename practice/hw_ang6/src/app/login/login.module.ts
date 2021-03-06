﻿import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './login.component';
import {
  RouterModule,
  Routes
} from '@angular/router';
import {AppComponentsModule} from '../shared/components/app-components.module';
import {MaterialsModule} from '../shared/components/materials/materials.module';
import {AuthService} from './services/auth.service';
import {ScheduleLoginComponent} from './schedule-login/schedule-login.component';
import {FakeService} from '../shared/services/fake.service';

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
    AuthService,
    FakeService
  ],
  exports: [
    LoginComponent,
    ScheduleLoginComponent
  ]
})

export class LoginModule {
}
