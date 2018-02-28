import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import {fadeInOutAnimation} from './../../animations';

@Component({
  selector: 'app-project-modal',
  templateUrl: './project-modal.component.html',
  styleUrls: ['./project-modal.component.scss'],
  animations: [fadeInOutAnimation]
})
export class ProjectModalComponent {

  /**
   * Variable for input closable
   * @type {boolean}
   * @memberof ProjectModalComponent
   */

  @Input() closable: boolean = true;

  /**
   * Variable for input visible
   * @type {boolean}
   * @memberof ProjectModalComponent
   */

  @Input() visible: boolean;

  /**
   * Variable for emit visibleChange
   * @type {EventEmitter<boolean>}
   * @memberof ProjectModalComponent
   */

  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  /**
   * Method for closing page
   * @returns {void}
   * @memberof ProjectModalComponent
   */

  close(): void {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

}
