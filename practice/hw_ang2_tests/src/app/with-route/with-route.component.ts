import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-with-route',
  templateUrl: './with-route.component.html',
  styleUrls: ['./with-route.component.css']
})
export class WithRouteComponent {

  constructor(
    private router: Router
  ) { }

  goToMain() {
    this.router.navigate(['/']);
  }

}
