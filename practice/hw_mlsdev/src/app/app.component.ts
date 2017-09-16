import { 
    UsersService,
    IData 
} from './shared';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import '../assets/style/style.scss';


declare let require: (filename: string) => any;

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

    activeUser: IData;

    constructor(
        private usersService: UsersService,
        private router: Router) { }

    ngOnInit() {
        this.usersService.activeUser$.subscribe(this.activeUserObserver.bind(this));
    }

    activeUserObserver(eventData: IData) {
        this.activeUser = eventData;       
    }
}