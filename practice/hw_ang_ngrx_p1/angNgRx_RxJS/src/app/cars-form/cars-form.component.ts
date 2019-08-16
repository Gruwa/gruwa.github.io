import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Car} from '../car.model';

@Component({
  selector: 'app-cars-form',
  templateUrl: './cars-form.component.html',
  styleUrls: ['./cars-form.component.scss']
})
export class CarsFormComponent implements OnInit {

  public carName: string = '';
  public carModel: string = '';

  @Output() addCar: EventEmitter<Car> = new EventEmitter<Car>();

  private id = 2;

  constructor() {
  }

  ngOnInit() {
  }

  public onAdd() {
    if (this.carName === '' || this.carModel === '') return;

    this.id = ++this.id;

    const car = new Car(
      this.carName,
      Date(),
      this.carModel,
      false,
      this.id
    );

    this.addCar.emit(car);

    this.carName = '';
    this.carModel = '';
  }

  public onLoad() {

  }
}
