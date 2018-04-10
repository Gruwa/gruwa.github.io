import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SpinnerComponent implements OnInit {

  public color: string = 'red';

  constructor() {
  }

  ngOnInit() {
  }

}
