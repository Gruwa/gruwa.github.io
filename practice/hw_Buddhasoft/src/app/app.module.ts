import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { 
    FormsModule,
    ReactiveFormsModule
} from '@angular/forms';

import { AppComponent } from './app.component';
import { Error404Component } from './error/404.component';
import { EventService,
         EventRouteActivatorService
} from './shared';
import { 
    ProductsComponent, 
    ProductComponent,
    NewProductComponent,
    EditProductComponent
} from './products';
import { JQ_TOKEN } from './shared';

declare let jQuery: Object;
 
@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule 
  ],
  declarations: [
    AppComponent,
    Error404Component,
    ProductsComponent,
    ProductComponent,
    NewProductComponent,
    EditProductComponent
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