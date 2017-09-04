import './../../node_modules/rxjs';
import { ContextMenuModule } from './../../node_modules/ngx-contextmenu';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { appRoutes } from './routes';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { 
        EventService,
        ToggleService,
        RedPencilService,
        EventRouteActivatorService,
        SearchService,
        TvmazeService
} from './shared';
import { Error404Component } from './error/404.component';
import { JQ_TOKEN } from './common';
import { 
    CreateContentComponent,
    ListContentComponent,
    ItemContentComponent,
    DoneItemContentComponent
} from './content';
import { 
    CreateSidebarComponent,
    EventsListComponent,
    RedPencilComponent,
    NewEventsComponent,
    ShowPencilEventsListDirective,
    SearchBarComponent,
    ResultComponent
} from './sidebar';
  
declare let jQuery: object;
 
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    ContextMenuModule,
    HttpModule
  ],
  declarations: [
    AppComponent,
    CreateSidebarComponent,
    CreateContentComponent,
    EventsListComponent,
    ListContentComponent,
    Error404Component,
    ItemContentComponent,
    RedPencilComponent,
    NewEventsComponent,
    DoneItemContentComponent,
    ShowPencilEventsListDirective,
    SearchBarComponent,
    ResultComponent
  ],
  providers: [
      EventService,
      ToggleService,
      RedPencilService,
      EventRouteActivatorService,
      SearchService,
      TvmazeService,
    {
      provide: JQ_TOKEN,
      useValue: jQuery
    }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }