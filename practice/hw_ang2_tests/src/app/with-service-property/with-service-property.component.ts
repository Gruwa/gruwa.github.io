import { Component } from '@angular/core';
import { HappyService } from '../services/happy.service';

@Component({
  selector: 'app-with-service-property',
  templateUrl: './with-service-property.component.html',
  styleUrls: ['./with-service-property.component.css']
})
export class WithServicePropertyComponent {

  public isHappy: boolean = false;

  constructor(private happyService: HappyService) {  };

  checkHappy() {
    this.isHappy = this.happyService.hasHappy;
  };

  toggleHappy() {
    this.happyService.hasHappy = !this.happyService.hasHappy;
    this.checkHappy();
  }

}
