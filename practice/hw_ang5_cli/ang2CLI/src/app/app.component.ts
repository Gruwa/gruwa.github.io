import { Component } from '@angular/core';
import { Route } from "@angular/compiler/src/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  text: string = '';
}
