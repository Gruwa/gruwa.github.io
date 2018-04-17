import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {Router, UrlSerializer} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LowerCaseUrlSerializer} from './shared/url-serializer.service';
import {AppComponentsModule} from './shared/components/app-components.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HttpService} from './shared/services/http.service';
import {AuthInterceptor} from './shared/services/interceptor';
import {Ng2Webstorage} from 'ngx-webstorage';
import {FakeService} from './shared/services/fake.service';
import {HttpGuardService} from './shared/services/http-guard.service';
import {DataService} from './shared/services/data.service';
import {FlexLayoutModule} from '@angular/flex-layout';
import {SpinnerComponent} from './shared/components/spinner/spinner.component';
import {MaterialsModule} from './shared/components/materials/materials.module';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppComponentsModule,
    HttpClientModule,
    Ng2Webstorage,
    FlexLayoutModule,
    MaterialsModule
  ],
  declarations: [
    AppComponent
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
    HttpGuardService,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
