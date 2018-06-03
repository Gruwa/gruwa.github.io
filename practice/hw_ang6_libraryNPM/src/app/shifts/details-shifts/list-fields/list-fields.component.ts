import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {IShift} from '../../../shared/interfaces/shift.interface';
import {LocalStorageService} from 'ngx-webstorage';
import {FlowService} from '../../../shared/services/flow.service';
import {DataService} from '../../../shared/services/data.service';

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
   * @param {FlowService} flowService
   * @param {DataService} dataService
   * @memberof ListFieldsComponent
   */

  constructor(public route: ActivatedRoute,
              public localStorage: LocalStorageService,
              public flowService: FlowService,
              public dataService: DataService) {
  }

  /**
   * Method ngOnInit
   * @returns {void}
   * @memberof ListFieldsComponent
   */

  ngOnInit(): void {
    if (this.shiftActive === undefined) {
      this.flowService[this.dataService.FLOW[this.localStorage.retrieve('tab')]].subscribe((resp) => {
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
