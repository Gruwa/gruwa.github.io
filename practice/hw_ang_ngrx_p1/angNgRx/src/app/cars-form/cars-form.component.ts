import {Component, OnInit} from '@angular/core';
import {Car} from '../car.model';
import {CarsService} from '../services/cars.service';

@Component({
  selector: 'app-cars-form',
  templateUrl: './cars-form.component.html',
  styleUrls: ['./cars-form.component.scss']
})
export class CarsFormComponent implements OnInit {

  public carName: string = '';
  public carModel: string = '';

  constructor(
    private carsService: CarsService
  ) {
  }

  ngOnInit() {
  }

  public onAdd() {
    if (this.carName === '' || this.carModel === '') return;

    const car = new Car(
      this.carName,
      Date(),
      this.carModel
    );

    this.carsService.addCar(car);

    this.carName = '';
    this.carModel = '';
  }

  public onLoad() {
    this.carsService.loadCars();
  }
}
