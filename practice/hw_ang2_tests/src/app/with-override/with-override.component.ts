import { Component } from '@angular/core';

@Component({
  selector: 'app-with-override',
  templateUrl: './with-override.component.html',
  styleUrls: ['./with-override.component.css']
})
export class WithOverrideComponent {

  public jesus: string = 'Jesus Statham';

  makePiwPiw(e = 'PiwPiw') {
    this.jesus = e;
  }
}
