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
import {LoginPageComponent} from './login-page.component';
import {ComponentsModule} from '../../shared/components/components.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Ng2Webstorage} from 'ngx-webstorage';
import {ToastModule} from 'ng2-toastr';

export const routes: Routes = [
  { path: 'login',
    component: LoginPageComponent,
    children: [
  // { path: 'reset_password/:uniq/:uniq2', component: ResetPasswordComponent }
    ]
  },
];


@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    // TranslateModule.forRoot({
    //   loader: {
    //     provide: TranslateLoader,
    //     useFactory: (createTranslateLoader),
    //     deps: [HttpClient]
    //   }
    // }),
    Ng2Webstorage
  ],
  declarations: [
    LoginPageComponent,
    // ResetPasswordComponent,
    // ResetEmailComponent
  ]
})
export class LoginModule { }
