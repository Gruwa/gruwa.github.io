import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { HttpModule } from '@angular/http';

import { ContextMenuModule } from './../../node_modules/ngx-contextmenu';
import { LocalStorageModule } from 'angular-2-local-storage';

import { AppComponent } from './app.component';
import { Error404Component } from './error/404.component';
import {
    ProductsService,
    EventRouteActivatorService
} from './shared';
import { 
    ProductsComponent, 
    ProductComponent,
    VerifyProductComponent
} from './products';
 
@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot(appRoutes),
        HttpModule,
        ContextMenuModule,
        LocalStorageModule.withConfig({
            prefix: 'my-app',
            storageType: 'localStorage'
        })
    ],
    declarations: [
        AppComponent,
        Error404Component,
        ProductsComponent,
        ProductComponent,
        VerifyProductComponent
    ],
    providers: [
        ProductsService,
        EventRouteActivatorService
    ],
    bootstrap: [ 
        AppComponent 
    ]
})

export class AppModule { 
  
}