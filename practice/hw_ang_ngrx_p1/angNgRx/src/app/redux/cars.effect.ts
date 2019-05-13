import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {CarsService} from '../services/cars.service';
import {CAR_ACTION} from './cars.action';
import {mergeMap, switchMap} from 'rxjs/operators';
import {Car} from '../car.model';

@Injectable()
export class CarsEffect {

  constructor(
    private actions$: Actions,
    private carsService: CarsService
  ) {
  }

  @Effect() loadCars = this.actions$
    .pipe(
      ofType(CAR_ACTION.ADD_CAR), // подписался на экшн эд кар
      switchMap(() => this.carsService.preLoadCars()), // получил еще один список каров из базы
      mergeMap((cars: Car[]) => { // объеденил оба потока с карами в один
        return [
          {
            type: CAR_ACTION.LOAD_CARS,
            data: cars
          }
        ];
      })
    );
}
