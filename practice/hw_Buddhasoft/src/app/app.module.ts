import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';

import { AppComponent } from './app.component';
import { Error404Component } from './error/404.component';
import { EventService } from './shared';
import { 
  ProductsComponent, 
  ProductComponent 
} from './products';
 
@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
  ],
  declarations: [
    AppComponent,
    Error404Component,
    ProductsComponent,
    ProductComponent
  ],
  providers: [
    EventService
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }