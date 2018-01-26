import { Component, Input, OnInit } from '@angular/core';
import { SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-project-bar',
  templateUrl: './project-bar.component.html',
  styleUrls: ['./project-bar.component.scss']
})
export class ProjectBarComponent implements OnInit {

  @Input() estimation: number;
  @Input() finished: number;
  @Input() color: string = '#2d9cce';
  private _width: number;

  constructor() {}

  ngOnInit() {
    this._width = (100 * this.finished) / this.estimation;
  }

  public get width() {
    return this._width;
  }

}
