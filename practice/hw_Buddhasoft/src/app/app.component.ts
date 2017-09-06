import { Router } from '@angular/router';
import { Component } from '@angular/core';

import '../assets/style/style.scss';


declare let require: (filename: string) => any;

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

    constructor(private router: Router) {

    }

    link() {
        this.router.navigate(['/products/new']);
    }
  
}