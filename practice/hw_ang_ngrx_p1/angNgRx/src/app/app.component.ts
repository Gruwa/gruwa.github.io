import {Component, OnInit} from '@angular/core';
import {Cars} from './car.model';
import {Store} from '@ngrx/store';
import {AppState} from './redux/app.state';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public carState: Observable<Cars>;

  constructor(
    private store: Store<AppState>) {

  }

  ngOnInit() {
    // this.store.select('carPage').subscribe(({cars}) => {
    //   console.log(cars);
    // });

    this.carState = this.store.select('carPage'); // select  - получения данных из стора
  }
}
