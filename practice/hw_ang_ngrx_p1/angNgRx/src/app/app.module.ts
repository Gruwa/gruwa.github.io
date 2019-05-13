import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CarsFormComponent} from './cars-form/cars-form.component';
import {CarComponent} from './car/car.component';
import {FormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import {carsRducer} from './redux/cars.reducer';
import {HttpClientModule} from '@angular/common/http';
import {EffectsModule} from '@ngrx/effects';
import {CarsEffect} from './redux/cars.effect';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment.prod';

@NgModule({
  declarations: [
    AppComponent,
    CarsFormComponent,
    CarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    EffectsModule.forRoot([CarsEffect]), // подключение модуля с эффектами
    StoreModule.forRoot({carPage: carsRducer}), // подключение стора и указания в руте списка редюссеров, например для разных активити это будут разные
    environment.production ? [] : StoreDevtoolsModule.instrument() // подключение девтул модуля для консоли в браузере
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
