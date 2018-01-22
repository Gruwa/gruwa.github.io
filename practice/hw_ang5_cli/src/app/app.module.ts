import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule
} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { ToastModule} from 'ng2-toastr/ng2-toastr';
import { ContextMenuModule } from 'ngx-contextmenu';
import { Ng2Webstorage } from 'ngx-webstorage';
import { ComponentsModule } from './shared/components/components.module';
import {
  TranslateModule,
  TranslateLoader
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import {
    MainPageComponent
} from './pages';
import {
  ProjectPointerDirective,
  ProjectTextDirective,
  ProjectTextEllipsisDirective,
  ProjectTitleDirective,
  ProjectListDirective
} from './shared/directives';
import {
  AuthService,
  ProjectInterceptor,
  MainService,
  UserService
} from './shared/services';
import { HelloPageComponent } from './pages/hello-page/hello-page.component';
import { FormPageComponent } from './pages/form-page/form-page.component';
import { Error404Component } from './pages/error404/error404.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
import { TabPageComponent } from './pages/tab-page/tab-page.component';
import { WrapperPageComponent } from './pages/wrapper-page/wrapper-page.component';
import { HeaderPageComponent } from './pages/header-page/header-page.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastModule.forRoot(),
    ComponentsModule,
    HttpClientModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    Ng2Webstorage,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [
    AppComponent,
    MainPageComponent,
    ProjectTextEllipsisDirective,
    ProjectTextDirective,
    ProjectTitleDirective,
    ProjectPointerDirective,
    ProjectListDirective,
    HelloPageComponent,
    FormPageComponent,
    Error404Component,
    TabPageComponent,
    WrapperPageComponent,
    HeaderPageComponent
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ProjectInterceptor,
      multi: true,
    },
    MainService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
