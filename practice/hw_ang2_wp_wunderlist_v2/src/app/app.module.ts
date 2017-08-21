import './../../node_modules/rxjs';
import { ContextMenuModule } from './../../node_modules/ngx-contextmenu';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { appRoutes } from './routes';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { 
        EventService,
        ToggleService,
        RedPencilService,
        EventRouteActivatorService
} from './shared';
import { Error404Component } from './error/404.component';
import { JQ_TOKEN } from './common';
import { 
    CreateContentComponent,
    ListContentComponent,
    ItemContentComponent
} from './content';
import { 
    CreateSidebarComponent,
    EventsListComponent,
    RedPencilComponent,
    NewEventsComponent
} from './sidebar';
  
declare let jQuery: object;
 
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    ContextMenuModule
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
    NewEventsComponent
  ],
  providers: [
      EventService,
      ToggleService,
      RedPencilService,
      EventRouteActivatorService,
    {
      provide: JQ_TOKEN,
      useValue: jQuery
    }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }