import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
 
import { AppComponent } from './app.component';
import { ContextMenuModule } from './../../node_modules/ngx-contextmenu';
import { LocalStorageModule } from 'angular-2-local-storage';
import {SharedModule} from "./shared/shared.module";
 
@NgModule({
  imports: [
      BrowserModule,
      SharedModule
  ],
  declarations: [
      AppComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }