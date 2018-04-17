import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/switchMap';
import {IShift} from '../../interfaces/shift.interface';
import {ShiftsService} from '../../../shifts/Services/shifts.service';
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

@Component({
  selector: 'app-list-fields',
  templateUrl: './list-fields.component.html',
  styleUrls: ['./list-fields.component.scss']
})
export class ListFieldsComponent implements OnInit {

  public shift: IShift;

  @Input() shiftActive;

  @Input() status;

  constructor(public route: ActivatedRoute,
              public shiftsService: ShiftsService,
              public localService: LocalStorageService,
              public dataService: DataService) {
  }

  ngOnInit() {
    if (this.shiftActive === undefined) {
      this.dataService[FLOW[this.localService.retrieve('tab')]].subscribe((resp) => {
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
