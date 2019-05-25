import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import {Router} from '@angular/router';
import {DataService} from '../../services/data.service';
import {Async} from '../../models/decorators';

/**
 * Small List Component
 */

@Component({
  selector: 'sw-app-small-list',
  templateUrl: './small-list.component.html',
  styleUrls: ['./small-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SmallListComponent implements OnChanges {

  /**
   * Input data of done
   * @type {boolean}
   * @memberof SmallListComponent
   */

  @Input() schedule: boolean = false;

  /**
   * Input variable list
   * @type {object}
   * @memberof SmallListComponent
   */

  @Input() list;

  /**
   * Async flow list$
   * @type {object}
   * @memberof SmallListComponent
   */

  @Async() list$;

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
   * @param {DataService} dataService
   * @memberof SmallListComponent
   */

  constructor(public router: Router,
              public dataService: DataService) {
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
    for (let i = 0; i < this.list.length; i++) {
      if (this.list[i].id === id) {
        this.list[i].value = action['checked'];
      }
    }
    this.outputActionToggle.emit(this.list);
  }

  /**
   * Method event of ngOnChanges
   * 1. pushing new data in flow when it change
   * @returns {void}
   * @param {SimpleChanges} changes
   * @memberof SmallListComponent
   */

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.list) {
      this.list$.next(this.list);
    }
  }
}
