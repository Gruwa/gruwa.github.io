import {Injectable} from '@angular/core';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import * as Types from '../interfaces/types.interface';
import {IShift} from '../interfaces/shift.interface';

@Injectable()
export class GuardService {

    /**
     * Method for guard shifts
     * @returns {Array<Types.IShift>}
     * @memberof ShiftsService
     */

    guardShifts(value): Array<IShift> {

        /**
         * Variable of shifts
         * @type {Array<Types.IShift>}
         * @memberof ShiftsService
         */

        const shifts: Array<IShift> = [];

        for (let i = 0; i > value.length; i++) {
            const obj: IShift = {
                'id': value[i].ID,
                'isDropRequest': value[i].IsDropRequest,
                'isPickupRequest': value[i].IsPickupRequest,
                'isVolunteers': value[i].IsVolunteers,
                'job': value[i].Job,
                'jobTitleGroup': value[i].jobTitleGroup,
                'stationGroup': value[i].stationGroup,
                'locationGroup': value[i].locationGroup,
                'jobID': value[i].JobID,
                'station': value[i].Station,
                'stationID': value[i].StationID,
                'dateFrom': value[i].dateFrom,
                'dateTo': value[i].dateTo,
                'location': value[i].Location,
            };

            shifts.push(obj);
        }

        return shifts;
    }
}
