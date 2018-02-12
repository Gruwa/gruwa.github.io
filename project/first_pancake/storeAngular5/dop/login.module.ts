import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {createTranslateLoader, SharedModule} from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ResetPasswordComponent } from '../src/app/pages/auth-page/reset-password/reset-password.component';
import { ResetEmailComponent } from './reset-email/reset-email.component';
import {HttpClient} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'reset', component: ResetEmailComponent },
  { path: 'reset_password/:uniq/:uniq2', component: ResetPasswordComponent }
];


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  declarations: [
    LoginComponent,
    ResetPasswordComponent,
    ResetEmailComponent
  ]
})
export class LoginModule { }
