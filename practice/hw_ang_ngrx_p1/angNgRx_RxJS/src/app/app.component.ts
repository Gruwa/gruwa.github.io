import {Component} from '@angular/core';
import {Car} from './car.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public cars: Car[] = [
    new Car('Ford', '12312312', 'Focus', false, 1),
    new Car('Subaru', '213123123', 'Forester', false, 2)
  ];

  public onCar(e: Car) {
    this.cars.push(e);
  }

  public onDelete(e: Car['id']) {
    const car = this.cars.find(s => s.id === e);
    this.cars.splice(this.cars.indexOf(car), 1);
  }
}
