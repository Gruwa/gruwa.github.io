import { JQ_TOKEN } from './common/index';
import { CreateContentComponent } from './content/create-content.component';
import { CreateSidebarComponent } from './sidebar/create-sidebar.component';
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
    CreateContentComponent
  ],
  providers: [
    {
      provide: JQ_TOKEN,
      useValue: jQuery
    }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }