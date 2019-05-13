import {Action} from '@ngrx/store';
import {Car} from '../car.model';

export namespace CAR_ACTION { // интерфейс экшенов
  export const ADD_CAR = 'ADD_CAR';
  export const DELETE_CAR = 'DELETE_CAR';
  export const UPDATE_CAR = 'UPDATE_CAR';
  export const LOAD_CARS = 'LOAD_CARS';
}

export class AddCar implements Action { // класс для экшена эдд кар
  readonly type = CAR_ACTION.ADD_CAR; // тип экшена поторому стейт будет понимать что именно нужно делать с пришедшими данными в свотчмапе

  constructor(public data: Car) { // payload или данные которые будут переданы в экшн для перезаписи в стейте
  }
}

export class DeleteCar implements Action {
  readonly type = CAR_ACTION.DELETE_CAR;

  constructor(public data: Car) {
  }

}

export class UpdateCar implements Action {
  readonly type = CAR_ACTION.UPDATE_CAR;

  constructor(public data: Car) {
  }
}

export class LoadCars implements Action {
  readonly type = CAR_ACTION.LOAD_CARS;

  constructor(public data: Car[]) {
  }
}

export type CarsAction = AddCar | DeleteCar | UpdateCar | LoadCars; // тип для инициализации редисера на свитчмапе
