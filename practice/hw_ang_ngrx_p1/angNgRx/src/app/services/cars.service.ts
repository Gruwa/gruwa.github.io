import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Store} from '@ngrx/store';
import {AppState} from '../redux/app.state';
import {AddCar, DeleteCar, LoadCars, UpdateCar} from '../redux/cars.action';
import {Car} from '../car.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  static BASE_URL: string = 'http://localhost:3333/';

  constructor(
    private http: HttpClient,
    private store: Store<AppState>) {
  }

  public preLoadCars() {
    return this.http.get(CarsService.BASE_URL + 'cars');
  }

  public loadCars(): void {
    this.preLoadCars()
      .subscribe((cars: Car[]) => {
        this.store.dispatch(new LoadCars(cars));
      });
  }

  public addCar(car: Car) {
    this.http.post(CarsService.BASE_URL + 'cars', car)
      .subscribe((item: Car) => {
        this.store.dispatch(new AddCar(item));
      });
  }

  public deleteCar(car: Car) {
    this.http.delete(CarsService.BASE_URL + 'cars/' + car.id)
      .subscribe(() => {
        this.store.dispatch(new DeleteCar(car));
      });
  }

  public editCar(car: Car) {
    this.http.patch(CarsService.BASE_URL + 'cars/' + car.id, car)
      .subscribe((item: Car) => {
        this.store.dispatch(new UpdateCar(item));
      });
  }
}
