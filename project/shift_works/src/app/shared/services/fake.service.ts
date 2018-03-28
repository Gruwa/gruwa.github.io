import {Injectable} from '@angular/core';
import * as faker from 'faker';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import * as Types from '../interfaces/types.interface';

@Injectable()
export class FakeService {

    constructor() {
    }

    /**
     * variable for fake shifts
     * @param {Array<Types.IShift>} value - array of shifts
     * @memberof FakeService
     */

    public shiftsDataFake: Array<Types.IShift> = [
        {
            'ID': 'ba348365-08f6-4c0c-959d-9a1acbb46b09',
            'IsDropRequest': false,
            'IsPickupRequest': false,
            'IsVolunteers': false,
            'Job': faker.random.word(),
            'JobID': faker.random.uuid(),
            'Station': null,
            'StationID': '00000000-0000-0000-0000-000000000000',
            'dateFrom': '8/31/2017 8:29:00 AM',
            'dateTo': '8/31/2017 3:00:00 PM'
        },
        {
            'ID': '14f7d015-c105-40cc-8bb6-b7d19ac1dd58',
            'IsDropRequest': false,
            'IsPickupRequest': false,
            'IsVolunteers': false,
            'Job': faker.random.word(),
            'JobID': faker.random.uuid(),
            'Station': null,
            'StationID': '00000000-0000-0000-0000-000000000000',
            'dateFrom': '8/31/2017 7:40:00 AM',
            'dateTo': '8/31/2017 3:00:00 PM'
        },
        {
            'ID': '1bc4475f-a024-431b-ab8a-009fe7387035',
            'IsDropRequest': false,
            'IsPickupRequest': false,
            'IsVolunteers': false,
            'Job': faker.random.word(),
            'JobID': faker.random.uuid(),
            'Station': null,
            'StationID': '00000000-0000-0000-0000-000000000000',
            'dateFrom': '3/31/2016 8:00:00 AM',
            'dateTo': '3/31/2016 3:00:00 PM'
        },
        {
            'ID': '2140b796-e99f-4981-8eba-fe36b878a4aa',
            'IsDropRequest': false,
            'IsPickupRequest': false,
            'IsVolunteers': false,
            'Job': faker.random.word(),
            'JobID': faker.random.uuid(),
            'Station': null,
            'StationID': '00000000-0000-0000-0000-000000000000',
            'dateFrom': '2/31/2017 8:00:00 AM',
            'dateTo': '2/31/2017 3:00:00 PM'
        },
        {
            'ID': '285602af-0c0f-490b-8644-7ecbdd6e56f3',
            'IsDropRequest': false,
            'IsPickupRequest': false,
            'IsVolunteers': false,
            'Job': faker.random.word(),
            'JobID': faker.random.uuid(),
            'Station': null,
            'StationID': '00000000-0000-0000-0000-000000000000',
            'dateFrom': '3/31/2017 8:00:00 AM',
            'dateTo': '3/31/2017 3:00:00 PM'
        },
        {
            'ID': 'ecca3fa8-54fb-44ef-99a5-640153cc0c35',
            'IsDropRequest': false,
            'IsPickupRequest': false,
            'IsVolunteers': false,
            'Job': faker.random.word(),
            'JobID': faker.random.uuid(),
            'Station': null,
            'StationID': '00000000-0000-0000-0000-000000000000',
            'dateFrom': '8/31/2017 8:15:00 AM',
            'dateTo': '8/31/2017 3:15:00 PM'
        },
    ];

    public dataResp: object = {
        status: 'success',
        items: this.shiftsDataFake
    };
}
