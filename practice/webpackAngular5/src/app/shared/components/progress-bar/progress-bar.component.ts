import { Component, Input, OnInit } from '@angular/core';
import { SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {

  @Input() estimation: number;
  @Input() finished: number;
  @Input() color: string = '#0200c1';
  private _width: number;

  constructor() {}

  ngOnInit() {
    this._width = (100 * this.finished) / this.estimation;
  }

  public get width() {
    return this._width;
  }

}
