import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { appRoutes } from './routes';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EventService } from './shared/event.service';
import { Error404Component } from './error/404.component';
import { JQ_TOKEN } from './common/index';
import { 
    CreateContentComponent,
    ListContentComponent,
    EventRouteActivatorService,
    ItemContentComponent
} from './content/index';
import { 
    CreateSidebarComponent,
    EventsListComponent,
    RedPencilComponent
} from './sidebar/index';
  
declare let jQuery: object;
 
@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    CreateSidebarComponent,
    CreateContentComponent,
    EventsListComponent,
    ListContentComponent,
    Error404Component,
    ItemContentComponent,
    RedPencilComponent
  ],
  providers: [
      EventService,
      EventRouteActivatorService,
    {
      provide: JQ_TOKEN,
      useValue: jQuery
    }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }