import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import {IGroupRestaurant} from '../../interfaces/group-restaurant.interface';
import {Router} from '@angular/router';

/**
 * Small List Component
 */

@Component({
  selector: 'app-small-list',
  templateUrl: './small-list.component.html',
  styleUrls: ['./small-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SmallListComponent {

  /**
   * Input data of done
   * @type {boolean}
   * @memberof SmallListComponent
   */

  @Input() schedule: boolean = false;

  /**
   * Input variable groups
   * @type {Array<IGroupRestaurant>}
   * @memberof SmallListComponent
   */

  @Input() lists;

  /**
   * Input data of toggle
   * @type {boolean}
   * @memberof SmallListComponent
   */

  @Input() toggle: boolean = false;

  /**
   * Output action of spinner
   * @type {boolean}
   * @memberof SmallListComponent
   */

  @Input() spinner: boolean = false;

  /**
   * Output action from small list
   * @memberof SmallListComponent
   */

  @Output() outputActionMethod: EventEmitter<any> = new EventEmitter();

  /**
   * Output action from Action Toggle
   * @memberof SmallListComponent
   */

  @Output() outputActionToggle: EventEmitter<any> = new EventEmitter();

  /**
   * Creates an instance of SmallListComponent
   * @param {Router} router
   * @memberof SmallListComponent
   */

  constructor(public router: Router) {
  }

  /**
   * Method onClickAction
   * @returns {void}
   * @param {any} list
   * @memberof SmallListComponent
   */

  public onClickAction(list: any): void {
    if (!this.toggle) {
      this.outputActionMethod.emit(list);
    }
  }

  /**
   * Method event of Toggle
   * @returns {void}
   * @param {boolean} action
   * @param {string} id
   * @memberof SmallListComponent
   */

  public onToggle(action: boolean, id: string): void {
    for (let i = 0; i < this.lists.length; i++) {
      if (this.lists[i].id === id) {
        this.lists[i].checked = action['checked'];
      }
    }
    this.outputActionToggle.emit(this.lists);
  }

}
