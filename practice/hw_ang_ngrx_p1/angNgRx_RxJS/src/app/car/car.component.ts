import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Car} from '../car.model';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss']
})
export class CarComponent {

  @Input() car: Car;
  @Output() deleteCar = new EventEmitter<Car['id']>();

  public onDelete() {
    this.deleteCar.emit(this.car.id);
  }

  public onBuy() {
    this.car.isSold = true;
  }

}
