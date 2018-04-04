import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {HttpService} from '../shared/services/http.service';
import {DataService} from '../shared/services/data.service';
import {LocalStorageService} from 'ngx-webstorage';
import {ActivatedRoute, Router} from '@angular/router';
import {ITabTypes} from '../shared/interfaces/types.interface';

/**
 * TABS for navigate
 */

const TABS: Array<ITabTypes> = [
  'upcoming',
  'my requests',
  'available'
];

@Component({
  selector: 'app-shifts',
  templateUrl: './shifts.component.html',
  styleUrls: ['./shifts.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ShiftsComponent implements OnInit {

  /**
   * Variable headerDescription
   * @type {string}
   * @memberof ShiftsComponent
   */

  public headerDescription: string = 'Shifts';

  /**
   * Variable tabsTitle
   * @type {Array<Types.tabTypes>}
   * @memberof TabComponent
   */

  tabsTitle: Array<ITabTypes> = ['upcoming', 'my requests', 'available'];

  /**
   * Variable of tab
   * @type {Types.ITabTypes}
   * @memberof ContentShiftsComponent
   */

  public tab: ITabTypes = 'upcoming';

  /**
   * Variable of tabIndex
   * @type {number}
   * @memberof ContentShiftsComponent
   */

  public tabIndex: number;

  /**
   * Variable of tabActive
   * @type {string}
   * @memberof ContentShiftsComponent
   */

  public tabActive: ITabTypes = 'upcoming';

  /**
   * Creates an instance of TabComponent
   * @param {LocalStorageService} dataService
   * @param {LocalStorageService} localStorage
   * @param {HttpService} httpService
   * @memberof TabComponent
   */

  constructor(public httpService: HttpService,
              public dataService: DataService,
              public localStorage: LocalStorageService,
              public route: ActivatedRoute,
              public router: Router) {
  }

  /**
   * Method ngOnInit
   * @returns {void}
   * @memberof TabComponent
   */

  ngOnInit() {
    if (this.localStorage.retrieve('tab') !== undefined) {
      this.tabActive = this.localStorage.retrieve('tab');
    } else {
      this.localStorage.store('tab', this.tabActive);
    }
    this.tabIndex = TABS.indexOf(this.localStorage.retrieve('tab'));

  }

  /**
   * Method for get changes on tab selectedTabChange
   * @returns {void}
   * @memberof TabComponent
   */

  selectedTabChange(value: any): void {
    this.tabActive = TABS[value.index];
    this.localStorage.store('tab', TABS[value.index]);
  }


}
