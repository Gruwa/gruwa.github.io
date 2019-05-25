import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { UrlSerializer } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LowerCaseUrlSerializer } from './shared/url-serializer.service';
import { AppComponentsModule } from './shared/components/app-components.module';
import {
    HTTP_INTERCEPTORS,
    HttpClientModule
} from '@angular/common/http';
import { AuthInterceptor } from './shared/services/interceptor';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialsModule } from './shared/components/materials/materials.module';
import { ToastrModule } from 'ngx-toastr';
import { SidebarModule } from './sidebar/sidebar.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        AppComponentsModule,
        HttpClientModule,
        NgxWebstorageModule.forRoot(),
        FlexLayoutModule,
        MaterialsModule,
        ToastrModule.forRoot({
            timeOut: 1500,
        }),
        SidebarModule,
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
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
