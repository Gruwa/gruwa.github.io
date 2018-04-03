import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {Router, UrlSerializer} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {PageNotFoundComponent} from './not-found.component';

import {LowerCaseUrlSerializer} from './shared/url-serializer.service';
import {AppComponentsModule} from './shared/components/app-components.module';
import {ShiftsService} from './shifts/Services/shifts.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HttpService} from './shared/services/http.service';
import {AuthInterceptor} from './shared/services/interceptor';
import {Ng2Webstorage} from 'ngx-webstorage';
import {FakeService} from './shared/services/fake.service';
import {GuardService} from './shared/services/guard.service';
import {DataService} from './shared/services/data.service';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppComponentsModule,
    HttpClientModule,
    Ng2Webstorage,
    FlexLayoutModule
  ],
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  providers: [
    {
      provide: UrlSerializer,
      useClass: LowerCaseUrlSerializer
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    HttpService,
    FakeService,
    GuardService,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
