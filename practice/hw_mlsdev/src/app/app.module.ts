import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { InlineSVGModule } from 'ng-inline-svg';

import { appRoutes } from './routes'; 
import { AppComponent } from './app.component';
import { Error404Component } from './error/404.component';
import {
    MainPageComponent,
    UserComponent,
    UserInformationComponent
} from './main-page';
import {
    UsersService,
    EventRouteActivatorService,
    RepoRouteActivatorService
} from './shared';
import { RepoComponent } from './repo/repo.component';
 
@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot(appRoutes),
        HttpModule,
        InlineSVGModule.forRoot({ baseUrl: './assets/img/svg' })
    ],
    declarations: [
        AppComponent,
        MainPageComponent,
        UserComponent,
        UserInformationComponent,
        Error404Component,
        RepoComponent
    ],
    providers: [
        UsersService,
        EventRouteActivatorService,
        RepoRouteActivatorService
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }