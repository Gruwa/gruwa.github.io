import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-bar',
  templateUrl: './project-bar.component.html',
  styleUrls: ['./project-bar.component.scss']
})
export class ProjectBarComponent implements OnInit {

  /**
   * Variable for input estimation
   * @type {number}
   * @memberof ProjectBarComponent
   */

  @Input() estimation: number;

  /**
   * Variable for input finished
   * @type {number}
   * @memberof ProjectBarComponent
   */

  @Input() finished: number;

  /**
   * Variable for input color
   * @type {string}
   * @memberof ProjectBarComponent
   */

  @Input() color: string = '#2d9cce';

  /**
   * Variable for input width
   * @type {number}
   * @memberof ProjectBarComponent
   */

  private _width: number;

  /**
   * Method ngOnInit
   * @returns {void}
   * @memberof ProjectBarComponent
   */

  ngOnInit() {
    this._width = (100 * this.finished) / this.estimation;
  }

  /**
   * Method for get width
   * @returns {number}
   * @memberof ProjectBarComponent
   */

  public get width(): number {
    return this._width;
  }

}
