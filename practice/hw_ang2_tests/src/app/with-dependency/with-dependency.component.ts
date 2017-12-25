import { Component } from '@angular/core';
import { HappyService } from '../services/happy.service';

@Component({
  selector: 'app-with-dependency',
  templateUrl: './with-dependency.component.html',
  styleUrls: ['./with-dependency.component.css']
})
export class WithDependencyComponent {
  public someHappy: string = 'No happiness yet';

  constructor(private happyService: HappyService) {  };

  getSomeHappy() {
    this.happyService.getHappy().subscribe((happyString: string) => {
      this.someHappy = happyString;
    });
  };

}
