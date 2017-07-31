import { JQ_TOKEN } from './common/index';
import { 
    CreateContentComponent,
    ListContentComponent
} from './content/index';
import { 
    CreateSidebarComponent,
    EventsListComponent,
    EventService
} from './sidebar/index';
  
import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
 
import { AppComponent } from './app.component';

declare let jQuery: object;
 
@NgModule({
  imports: [
    BrowserModule
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