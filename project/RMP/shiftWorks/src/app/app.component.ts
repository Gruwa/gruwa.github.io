import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {LocalStorageService} from 'ngx-webstorage';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit{

  constructor( private localStorage: LocalStorageService) {

  }
  ngOnInit() {
    this.localStorage.store('group', ' ');
    this.localStorage.store('token', ' ');
  }
}
