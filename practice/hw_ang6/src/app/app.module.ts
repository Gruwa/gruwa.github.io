import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {UrlSerializer} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LowerCaseUrlSerializer} from './shared/url-serializer.service';
import {AppComponentsModule} from './shared/components/app-components.module';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule
} from '@angular/common/http';
import {AuthInterceptor} from './shared/services/interceptor';
import {Ng2Webstorage} from 'ngx-webstorage';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MaterialsModule} from './shared/components/materials/materials.module';
import {ToastrModule} from 'ngx-toastr';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppComponentsModule,
    HttpClientModule,
    Ng2Webstorage,
    FlexLayoutModule,
    MaterialsModule,
    ToastrModule.forRoot({
      timeOut: 1500,
    }),
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
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
