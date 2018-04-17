import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-project-circle',
  templateUrl: './project-circle.component.html',
  styleUrls: ['./project-circle.component.scss']
})
export class ProjectCircleComponent {

  /**
   * Variable for input progress
   * @type {number}
   * @memberof ProjectCircleComponent
   */

  @Input() progress: number = 0;
}
