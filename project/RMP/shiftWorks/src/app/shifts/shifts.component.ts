import {Component, OnInit} from '@angular/core';
import {HttpService} from '../shared/services/http.service';
import * as Types from '../shared/interfaces/types.interface';
import {DataService} from '../shared/services/data.service';
import {LocalStorageService} from 'ngx-webstorage';
import {ActivatedRoute, Router} from '@angular/router';

/**
 * TABS for navigate
 */

const TABS: Array<Types.ITabTypes> = [
  'upcoming',
  'my requests',
  'available'
];

@Component({
  selector: 'app-shifts',
  templateUrl: './shifts.component.html',
  styleUrls: ['./shifts.component.scss'],
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

  tabsTitle: Array<Types.ITabTypes> = ['upcoming', 'my requests', 'available'];

  /**
   * Variable of tab
   * @type {Types.ITabTypes}
   * @memberof ContentShiftsComponent
   */

  public tab: Types.ITabTypes = 'upcoming';

  /**
   * Variable of tabIndex
   * @type {number}
   * @memberof ContentShiftsComponent
   */

  public tabIndex: number;

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
    this.httpService.getShifts();
    this.tabIndex = TABS.indexOf(this.localStorage.retrieve('tab'));
  }

  /**
   * Method for get changes on tab selectedTabChange
   * @returns {void}
   * @memberof TabComponent
   */

  selectedTabChange(value: any): void {
    console.log(TABS[value.index]);
    // this.localStorage.store('tab', TABS[value.index]);
    this.dataService.dataTab$.next(TABS[value.index]);
  }


}
