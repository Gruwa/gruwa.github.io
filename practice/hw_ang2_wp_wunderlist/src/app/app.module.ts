import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { appRoutes } from './routes';
import { AppComponent } from './app.component';

import { JQ_TOKEN } from './common/index';
import { 
    CreateContentComponent,
    ListContentComponent
} from './content/index';
import { 
    CreateSidebarComponent,
    EventsListComponent
} from './sidebar/index';
import { 
    EventService
} from './shared/event.service';
  
declare let jQuery: object;
 
@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [
    AppComponent,
    CreateSidebarComponent,
    CreateContentComponent,
    EventsListComponent,
    ListContentComponent
  ],
  providers: [
      EventService,
    {
      provide: JQ_TOKEN,
      useValue: jQuery
    }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }