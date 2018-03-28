import {Injectable} from '@angular/core';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import * as Types from '../interfaces/types.interface';

@Injectable()
export class GuardService {

    /**
     * Method for guard shifts
     * @returns {Array<Types.IShift>}
     * @memberof ShiftsService
     */

    guardShifts(value: Array<Types.IShift>): Array<Types.IShift> {

        /**
         * Variable of shifts
         * @type {Array<Types.IShift>}
         * @memberof ShiftsService
         */

        const shifts: Array<Types.IShift> = [];

        for (let i = 0; i > value.length; i++) {
            const obj: Types.IShift = {
                'ID': value[i].ID,
                'IsDropRequest': value[i].IsDropRequest,
                'IsPickupRequest': value[i].IsPickupRequest,
                'IsVolunteers': value[i].IsVolunteers,
                'Job': value[i].Job,
                'JobID': value[i].JobID,
                'Station': value[i].Station,
                'StationID': value[i].StationID,
                'dateFrom': value[i].dateFrom,
                'dateTo': value[i].dateTo
            };

            shifts.push(obj);
        }

        return shifts;
    }
}
