import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/switchMap';
import {IShift} from '../../interfaces/shift.interface';
import {LocalStorageService} from 'ngx-webstorage';
import {DataService} from '../../services/data.service';

/**
 * FLOW for api link
 */

const FLOW = {
  upcoming: 'dataShiftsUpcoming$',
  'my requests': 'dataShiftsMyReq$',
  available: 'dataShiftsAvailable$'
};

/**
 * List Fields Component
 * for showing some fields of shifts
 */

@Component({
  selector: 'app-list-fields',
  templateUrl: './list-fields.component.html',
  styleUrls: ['./list-fields.component.scss']
})
export class ListFieldsComponent implements OnInit {

  /**
   * Variable shift
   * @type {IShift}
   * @memberof ListFieldsComponent
   */

  public shift: IShift;

  /**
   * Input variable shiftActive
   * @type {object}
   * @memberof ListFieldsComponent
   */

  @Input() shiftActive: object;

  /**
   * Input variable status
   * @type {string}
   * @memberof ListFieldsComponent
   */

  @Input() status: string;

  /**
   * Creates an instance of ListFieldsComponent
   * @param {ActivatedRoute} route
   * @param {LocalStorageService} localStorage
   * @param {DataService} dataService
   * @memberof ListFieldsComponent
   */

  constructor(public route: ActivatedRoute,
              public localStorage: LocalStorageService,
              public dataService: DataService) {
  }

  /**
   * Method ngOnInit
   * @returns {void}
   * @memberof ListFieldsComponent
   */

  ngOnInit(): void {
    if (this.shiftActive === undefined) {
      this.dataService[FLOW[this.localStorage.retrieve('tab')]].subscribe((resp) => {
        let array = [];

        for (const key in resp) {
          if (key === 'items') {
            array = array.concat(resp[key]);

            this.shift = array.find(item => item.shiftID === this.route.snapshot.params['id']);
            console.log(array);
          }
        }
      });
    } else {
      this.shift = this.shiftActive['item'];
    }
  }
}
