import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule
} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';


import {AppComponent} from './app.component';
import {ToastModule} from 'ng2-toastr';
import {ContextMenuModule} from 'ngx-contextmenu';
import {Ng2Webstorage} from 'ngx-webstorage';
import {LoadingModule} from 'ngx-loading';
import {ComponentsModule} from './shared/components/components.module';
import {
  TranslateModule,
  TranslateLoader
} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {
  AuthService,
  ProjectInterceptor,
  MainService,
  UserService,
  RouteActivatorService,
  UserResolverService
} from './shared/services';
import {Error404Component} from './pages/error404/error404.component';
import {RouterModule} from '@angular/router';
import {appRoutes} from './app.routes';
import {WrapperPageComponent} from './pages/wrapper-page/wrapper-page.component';

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
    LoadingModule,
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
    Error404Component,
    WrapperPageComponent
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ProjectInterceptor,
      multi: true,
    },
    MainService,
    UserService,
    RouteActivatorService,
    UserResolverService
  ],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule {
}
