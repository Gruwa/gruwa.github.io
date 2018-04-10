import {Component, Input} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LocalStorageService} from 'ngx-webstorage';
import {DataService} from '../../services/data.service';


@Component({
  selector: 'app-header-shifts',
  templateUrl: './header-shifts.component.html',
  styleUrls: ['./header-shifts.component.scss']
})
export class HeaderShiftsComponent {

  /**
   * Input variable headerDescription
   * @type {string}
   * @memberof HeaderShiftsComponent
   */

  @Input() headerDescription: string;

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
   * Input variable tab
   * @type {string}
   * @memberof HeaderShiftsComponent
   */

  @Input() tab: string = '';

  /**
   * Creates an instance of DetailsShiftsComponent
   * @param {ActivatedRoute} route
   * @param {LocalStorageService} localStorage
   * @param {Router} router
   * @memberof HeaderShiftsComponent
   */

  constructor(public router: Router,
              public localStorage: LocalStorageService,
              public route: ActivatedRoute,
              public dataService: DataService) {
  }

  /**
   * Method closeOurPage for router on shifts page
   * @returns {void}
   * @memberof HeaderShiftsComponent
   */

  closeOurPage(): void {
    this.router.navigate(['/' + this.route.snapshot.params['group'], 'shifts']);
  }

  /**
   * Method showSideBar for show menu
   * @returns {void}
   * @memberof HeaderShiftsComponent
   */

  showSideBar(): void {

  }

  /**
   * Method onSave for save shift
   * @returns {void}
   * @memberof HeaderShiftsComponent
   */

  onSave(): void {
    this.dataService.dataSave$.next(true);
  }

}
