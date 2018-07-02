import { Component, OnInit } from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {Validators} from '@angular/forms';
import {IFormAvailabilityDescription} from '../../shared/interfaces/types.interface';
import {DataService} from '../../shared/services/data.service';

@Component({
  selector: 'app-edit-availability',
  templateUrl: './edit-availability.component.html',
  styleUrls: ['./edit-availability.component.scss']
})
export class EditAvailabilityComponent implements OnInit {

  /**
   * Variable formDescription
   * @type {IShift}
   * @memberof FormComponent
   */

  public formDescriptions;
  //
  // /**
  //  * Variable availbleInput
  //  * @type {boolean}
  //  * @memberof FormComponent
  //  */
  //
  // public availbleInput: boolean;
  //
  // /**
  //  * Variable shiftForm
  //  * @type {IForm}
  //  * @memberof FormComponent
  //  */
  //
  // public shiftGroup: FormGroup;
  //
  // /**
  //  * Variable of ngUnsubscribe
  //  * @type {Subject<void>}
  //  * @memberof FormComponent
  //  */
  //
  // private ngUnsubscribe: Subject<void> = new Subject<void>();
  //
  // /**
  //  * Input variable status
  //  * @type {string}
  //  * @memberof FormComponent
  //  */
  //
  // @Input() status: string;
  //
  // /**
  //  * Input variable shiftActive
  //  * @type {object}
  //  * @memberof FormComponent
  //  */
  //
  // @Input() shiftActive: IShift;
  //
  // /**
  //  * Variable tab
  //  * @type {ITabTypesShifts}
  //  * @memberof FormComponent
  //  */
  //
  // @Input() tab: ITabTypesShifts;
  //
  /**
   * Creates an instance of FormComponent
   * @param {Router} router
   * @param {ActivatedRoute} route
   * @param {FormBuilder} fb
   * @param {DataService} dataService
   * @memberof FormComponent
   */

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.formDescriptions = this.dataService.LIST_DESCRIPTIONS;
    // this.flowService.dataSave$.pipe(
    //   takeUntil(this.ngUnsubscribe)
    // ).subscribe(this.setBody.bind(this));
    // // this.tab === 'my requests' ? this.availbleInput = false : this.availbleInput = true;
    //
    // // console.log('shiftActive details', this.shiftActive);
    //
    // this.initForm();
  }

  // /**
  //  * Method for init form
  //  * @returns {void}
  //  * @memberof FormComponent
  //  */
  //
  // initForm(): void {
  //   this.shiftGroup = this.fb.group({
  //     shiftTitle: ['', [Validators.required, Validators.minLength(1)]],
  //     date: ['', [Validators.required]],
  //     startTime: ['', [Validators.required]],
  //     endTime: ['', [Validators.required]],
  //     locationID: ['', [Validators.required]],
  //     stationID: ['', [Validators.required]],
  //     jobID: ['', [Validators.required]],
  //     status: ['', [Validators.required]]
  //   });
  //   this.shift = {
  //     item: {},
  //     locationList: [],
  //     stationList: [],
  //     jobList: []
  //   };
  //
  //   if (this.route.snapshot.params['id'] !== 'new') {
  //     this.getShift();
  //   }
  // }
  //
  // getShift(): void {
  //   if (this.shiftActive === undefined) {
  //     this.flowService[this.dataService.FLOW[this.localStorage.retrieve('tab')]].pipe(
  //       takeUntil(this.ngUnsubscribe)
  //     ).subscribe((resp) => {
  //       let array = [];
  //
  //       for (const key in resp) {
  //         if (key === 'items') {
  //           array = array.concat(resp[key]);
  //
  //           const item = array.find(value => value.shiftID === this.route.snapshot.params['id']);
  //
  //           this.shift = {
  //             item: item,
  //             locationList: resp.locationList,
  //             stationList: resp.stationList,
  //             jobList: resp.jobList
  //           };
  //           if (!this.shift['item'].isDropRequest && !this.shift['item'].isPickupRequest) {
  //             this.status = this.dataService.STATUS['scheduled'];
  //           } else {
  //             this.status = ' ';
  //           }
  //           this.setDataForm();
  //         }
  //       }
  //     });
  //   } else {
  //     this.shift = this.shiftActive;
  //     this.setDataForm();
  //   }
  // }
  //
  // /**
  //  * Method for set data in form
  //  * @returns {void}
  //  * @memberof FormComponent
  //  */
  //
  // setDataForm(): void {
  //   this.shiftGroup = this.fb.group({
  //     shiftTitle: this.shift['item'].shiftTitle,
  //     date: this.shift['item'].dateFrom,
  //     startTime: moment(this.shift['item'].dateFrom).utcOffset(0, false).format('HH:mm'),
  //     endTime: moment(this.shift['item'].dateTo).utcOffset(0, false).format('HH:mm'),
  //     locationID: this.shift['item'].locationID,
  //     stationID: this.shift['item'].stationID,
  //     jobID: this.shift['item'].jobID,
  //     status: this.status
  //   });
  // }
  //
  // /**
  //  * Method for set data in form
  //  * @returns {void}
  //  * @memberof FormComponent
  //  */
  //
  // setNewData(): void {
  //
  // }
  //
  // /**
  //  * Method for get body
  //  * @returns {void}
  //  * @memberof FormComponent
  //  */
  //
  // setBody(value: string): void {
  //   if (value === 'save') {
  //     if (!this.shiftGroup.invalid) {
  //       const body = {
  //         'ShiftTitle': this.shiftGroup.get('shiftTitle').value,
  //         'JobID': this.shiftGroup.get('jobID').value,
  //         'StationID': this.shiftGroup.get('stationID').value,
  //         'DateFrom': this.shiftsService.createDate(
  //           this.shiftGroup.get('date').value,
  //           this.shiftGroup.get('startTime').value,
  //           this.shiftGroup.get('endTime').value)[0],
  //         'DateTo': this.shiftsService.createDate(
  //           this.shiftGroup.get('date').value,
  //           this.shiftGroup.get('startTime').value,
  //           this.shiftGroup.get('endTime').value)[1],
  //         'LocationID': this.shiftGroup.get('locationID').value,
  //         'ShiftID': this.shift['item'].shiftID,
  //         'IsDropRequest': this.shift['item'].isDropRequest,
  //         'IsPickupRequest': this.shift['item'].isPickupRequest,
  //         'Job': this.shift['jobList'].find(job => job.id === this.shiftGroup.get('jobID').value)['description'],
  //         'Station': this.shift['stationList'].find(station => station.id === this.shiftGroup.get('stationID').value)['description'],
  //         'Location': this.shift['locationList'].find(location => location.id === this.shiftGroup.get('locationID').value)['description'],
  //       };
  //       this.flowService.dataSave$.next(body);
  //     }
  //   }
  // }
  //
  // /**
  //  * Method ngOnDestroy
  //  * @returns {void}
  //  * @memberof FormComponent
  //  */
  //
  // ngOnDestroy(): void {
  //   this.ngUnsubscribe.next();
  //   this.ngUnsubscribe.complete();
  // }

}
