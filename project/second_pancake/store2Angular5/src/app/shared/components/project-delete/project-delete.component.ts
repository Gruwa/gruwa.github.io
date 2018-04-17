import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'project-delete',
  templateUrl: './project-delete.component.html',
  styleUrls: ['./project-delete.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProjectDeleteComponent {

  /**
   * Variable for input entityName
   * @type {string}
   * @memberof ProjectDeleteComponent
   */

  @Input() entityName: string = 'user';

  /**
   * Variable for emit value
   * @type {EventEmitter<any>}
   * @memberof ProjectDeleteComponent
   */

  @Output() onDelete: EventEmitter<any> = new EventEmitter();

  /**
   * Creates an instance of ProjectDeleteComponent.
   * @param {TranslateService} translate
   * @memberof ProjectDeleteComponent
   */

  constructor(public translate: TranslateService) { }

  /**
   * Method for delete
   * @params {boolean} needDelete
   * @returns {void}
   * @memberof ProjectDeleteComponent
   */

  onDeleteClick(needDelete: boolean = false): void {
    this.onDelete.emit(needDelete);
  }
}
