import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './login.component';
import {LogoutComponent} from './logout.component';
import {RouterModule, Routes} from '@angular/router';
import {AppComponentsModule} from '../shared/components/app-components.module';
import {MaterialsModule} from '../shared/components/materials/materials.module';
import {GuardService} from '../shared/services/guard.service';
import {AuthService} from './services/auth.service';
import {AuthGuardService} from './services/auth.guard.service';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'what???',
    component: LogoutComponent,
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
    LogoutComponent
  ],
  providers: [
    AuthGuardService,
    AuthService
  ]
})

export class LoginModule { }
