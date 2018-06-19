import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {LocalStorageService} from 'ngx-webstorage';
import {FlowService} from '../../services/flow.service';

/**
 * Header Shifts Component
 */

@Component({
  selector: 'app-header-shifts',
  templateUrl: './header-shifts.component.html',
  styleUrls: ['./header-shifts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderShiftsComponent implements OnInit {

  /**
   * Variable arrow
   * @type {boolean}
   * @memberof HeaderShiftsComponent
   */

  public arrow: boolean = false;

  /**
   * Input variable headerDescription
   * @type {string}
   * @memberof HeaderShiftsComponent
   */

  @Input() headerDescription: string = 'some description here';

  /**
   * Input variable accountDescription for account description
   * @type {string}
   * @memberof HeaderShiftsComponent
   */

  @Input() accountDescription: string = 'some description here';

  /**
   * Input variable roomDescription for restaurant description
   * @type {string}
   * @memberof HeaderShiftsComponent
   */

  @Input() roomDescription: string = 'some description here';

  /**
   * Input variable sideBar
   * @type {boolean}
   * @memberof HeaderShiftsComponent
   */

  @Input() sideBar: boolean = false;

  /**
   * Input variable close Page
   * @type {boolean}
   * @memberof HeaderShiftsComponent
   */

  @Input() closePage: boolean = false;

  /**
   * Input variable arrowBack
   * @type {boolean}
   * @memberof HeaderShiftsComponent
   */

  @Input() arrowBack: boolean = false;

  /**
   * Input variable delete for show tab
   * @type {boolean}
   * @memberof HeaderShiftsComponent
   */

  @Input() delete: boolean = false;

  /**
   * Input variable save for show tab
   * @type {boolean}
   * @memberof HeaderShiftsComponent
   */

  @Input() save: boolean = false;

  /**
   * Input variable room for show group of restaurants
   * @type {boolean}
   * @memberof HeaderShiftsComponent
   */

  @Input() room: boolean = false;

  /**
   * Input variable room for show group of restaurants
   * @type {boolean}
   * @memberof HeaderShiftsComponent
   */

  @Input() account_circle: boolean = false;

  /**
   * Input variable logoSmall for show small logo
   * @type {boolean}
   * @memberof HeaderShiftsComponent
   */

  @Input() logoSmall: boolean = false;

  /**
   * Input variable description for show description of header
   * @type {boolean}
   * @memberof HeaderShiftsComponent
   */

  @Input() description: boolean = false;

  /**
   * Input variable tab
   * @type {string}
   * @memberof HeaderShiftsComponent
   */

  @Input() tab: string = '';

  /**
   * Output action from header
   * @memberof HeaderShiftsComponent
   */

  @Output() outputActionMethod = new EventEmitter();

  /**
   * Creates an instance of DetailsShiftsComponent
   * @param {ActivatedRoute} route
   * @param {LocalStorageService} localStorage
   * @param {FlowService} flowService
   * @param {Router} router
   * @memberof HeaderShiftsComponent
   */

  constructor(public router: Router,
              public localStorage: LocalStorageService,
              public route: ActivatedRoute,
              public flowService: FlowService) {
  }

  /**
   * Method ngOnInit
   * @returns {void}
   * @memberof HeaderShiftsComponent
   */

  public ngOnInit(): void {
    this.flowService.dataSideBarGroupRestaurants$.subscribe((next) => {
      this.arrow = next;
    });
  }

  /**
   * Method closeOurPage for router on shifts page
   * @returns {void}
   * @memberof HeaderShiftsComponent
   */

  public clickEvent(): void {
    this.outputActionMethod.emit('header');
  }

  /**
   * Method onSave for save shift
   * @returns {void}
   * @memberof HeaderShiftsComponent
   */

  public onSave(): void {
    this.flowService.dataSave$.next('save');
  }

  /**
   * Method show group of restaurants
   * @returns {void}
   * @memberof HeaderShiftsComponent
   */

  public showGroupRestaurants(): void {
    this.arrow = !this.arrow;
    this.flowService.dataSideBarGroupRestaurants$.next(this.arrow);
  }

}
