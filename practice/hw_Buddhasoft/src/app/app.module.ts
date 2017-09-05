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
    EditProductComponent,
    VerifyProductComponent
} from './products';
 
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
    EditProductComponent,
    VerifyProductComponent
  ],
  providers: [
    EventService,
    EventRouteActivatorService
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }