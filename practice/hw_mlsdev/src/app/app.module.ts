import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { appRoutes } from './routes'; 
import { AppComponent } from './app.component';
import { Error404Component } from './error/404.component';
import {
    UsersComponent,
    UserComponent
} from './users';
import {
    UsersService,
    EventRouteActivatorService
} from './shared';
 
@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot(appRoutes)
    ],
    declarations: [
        AppComponent,
        UsersComponent,
        UserComponent,
        Error404Component
    ],
    providers: [
        UsersService,
        EventRouteActivatorService
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }