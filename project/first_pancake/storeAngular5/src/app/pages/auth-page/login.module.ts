import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { LoginComponent } from './login/login.component';
// import {createTranslateLoader} from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
// import { ResetPasswordComponent } from './reset-password/reset-password.component';
// import { ResetEmailComponent } from './reset-email/reset-email.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {LoginPageComponent} from './login-page/login-page.component';
import {ComponentsModule} from '../../shared/components/components.module';
import {Ng2Webstorage} from 'ngx-webstorage';
import {ToastModule} from 'ng2-toastr';
import {AuthPageComponent} from './auth-page.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {Error404Component} from '../error404/error404.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthPageComponent,
    children: [
      {path: 'login', component: LoginPageComponent},
      {path: 'reset_password/:uniq/:uniq2', component: ResetPasswordComponent},
      {path: '', redirectTo: '/auth/login', pathMatch: 'full'},
      {path: '**', redirectTo: '/auth/login'}
    ]
  }
];

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    Ng2Webstorage
  ],
  declarations: [
    LoginPageComponent,
    AuthPageComponent,
    ResetPasswordComponent
  ]
})
export class LoginModule { }
