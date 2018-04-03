var express = require('express');
var router = express.Router();
var dockerCommandsRepository = require('../lib/dockerCommandsRepository');
var faker = require('faker');

var Users = require('../models/users');
var Groups = require('../models/groups');
var Locations = require('../models/locations');
var Jobs = require('../models/jobs');
var Stations = require('../models/stations');
var Shifts = require('../models/shifts');

var Login = {
    Token: '',
    Success: 'true',
    Message: '',
    Items: [
        {ID: faker.random.uuid(), Description: faker.commerce.department()},
        {ID: faker.random.uuid(), Description: faker.commerce.department()},
        {ID: faker.random.uuid(), Description: faker.commerce.department()},
        {ID: faker.random.uuid(), Description: faker.commerce.department()},
        {ID: faker.random.uuid(), Description: faker.commerce.department()}
    ],
    LocationList: [
        {ID: faker.random.uuid(), Description: faker.address.city()},
        {ID: faker.random.uuid(), Description: faker.address.city()},
        {ID: faker.random.uuid(), Description: faker.address.city()},
        {ID: faker.random.uuid(), Description: faker.address.city()},
        {ID: faker.random.uuid(), Description: faker.address.city()}
    ],
    StationList: [
        {ID: faker.random.uuid(), Description: faker.random.words()},
        {ID: faker.random.uuid(), Description: faker.random.words()},
        {ID: faker.random.uuid(), Description: faker.random.words()},
        {ID: faker.random.uuid(), Description: faker.random.words()}
    ],
    JobList: [
        {ID: faker.random.uuid(), Description: faker.random.words()},
        {ID: faker.random.uuid(), Description: faker.random.words()},
        {ID: faker.random.uuid(), Description: faker.random.words()},
        {ID: faker.random.uuid(), Description: faker.random.words()},
        {ID: faker.random.uuid(), Description: faker.random.words()},
        {ID: faker.random.uuid(), Description: faker.random.words()}
    ]
};

var StationList = [
    {
        ID: 'station1',
        Description: faker.random.words()
    },
    {
        ID: 'station2',
        Description: faker.random.words()
    },
    {
        ID: 'station3',
        Description: faker.random.words()
    },
    {
        ID: 'station4',
        Description: faker.random.words()
    }
];

var JobList = [
    {
        ID: 'job1',
        Description: faker.random.words()
    },
    {
        ID: 'job2',
        Description: faker.random.words()
    },
    {
        ID: 'job3',
        Description: faker.random.words()
    },
    {
        ID: 'job4',
        Description: faker.random.words()
    },
    {
        ID: 'job5',
        Description: faker.random.words()
    },
    {
        ID: 'job6',
        Description: faker.random.words()
    }
];

var LocationList = [
    {
        ID: 'location1',
        Description: faker.address.city()
    },
    {
        ID: 'location2',
        Description: faker.address.city()
    },
    {
        ID: 'location3',
        Description: faker.address.city()
    },
    {
        ID: 'location4',
        Description: faker.address.city()
    },
    {
        ID: 'location5',
        Description: faker.address.city()
    }
];

var GroupList = [
    {
        ID: faker.random.uuid(),
        Description: faker.commerce.department()
    },
    {
        ID: faker.random.uuid(),
        Description: faker.commerce.department()
    },
    {
        ID: faker.random.uuid(),
        Description: faker.commerce.department()
    },
    {
        ID: faker.random.uuid(),
        Description: faker.commerce.department()
    },
    {
        ID: faker.random.uuid(),
        Description: faker.commerce.department()
    }
];

var UserList = [
    {
        login: 'test@test.test',
        password: '123qwe123'
    },
    {
        login: 'test1@test.test',
        password: ''
    },
    {
        login: 'test2@test.test',
        password: ''
    }
];

var ShiftList = [
    {
        'ShiftID': 'ba348365-08f6-4c0c-959d-9a1acbb46b09',
        'IsDropRequest': false,
        'IsPickupRequest': false,
        'JobID': 'job1',
        'Job': JobList,
        'Station': StationList,
        'StationID': 'station1',
        'Location': LocationList,
        'LocationID': 'location1',
        'DateFrom': '8/31/2017 8:29:00 AM',
        'DateTo': '8/31/2017 3:00:00 PM'
    },
    {
        'ShiftID': '14f7d015-c105-40cc-8bb6-b7d19ac1dd58',
        'IsDropRequest': false,
        'IsPickupRequest': false,
        'JobID': 'job1',
        'Job': JobList,
        'Station': StationList,
        'StationID': 'station1',
        'Location': LocationList,
        'LocationID': 'location1',
        'dateFrom': '8/31/2017 7:40:00 AM',
        'dateTo': '8/31/2017 3:00:00 PM'
    },
    {
        'ShiftID': '22f7d015-c105-40cc-8bb6-b7d19ac1dd58',
        'IsDropRequest': false,
        'IsPickupRequest': false,
        'JobID': 'job1',
        'Job': JobList,
        'Station': StationList,
        'StationID': 'station1',
        'Location': LocationList,
        'LocationID': 'location1',
        'dateFrom': '3/31/2016 8:00:00 AM',
        'dateTo': '3/31/2016 3:00:00 PM'
    },
    {
        'ShiftID': '33f7d015-c105-40cc-8bb6-b7d19ac1dd58',
        'IsDropRequest': false,
        'IsPickupRequest': false,
        'JobID': 'job1',
        'Job': JobList,
        'Station': StationList,
        'StationID': 'station1',
        'Location': LocationList,
        'LocationID': 'location1',
        'dateFrom': '2/31/2017 8:00:00 AM',
        'dateTo': '2/31/2017 3:00:00 PM'
    },
    {
        'ShiftID': '44f7d015-c105-40cc-8bb6-b7d19ac1dd58',
        'IsDropRequest': false,
        'IsPickupRequest': false,
        'JobID': 'job1',
        'Job': JobList,
        'Station': StationList,
        'StationID': 'station1',
        'Location': LocationList,
        'LocationID': 'location1',
        'dateFrom': '3/31/2017 8:00:00 AM',
        'dateTo': '3/31/2017 3:00:00 PM'
    },
    {
        'ShiftID': '55f7d015-c105-40cc-8bb6-b7d19ac1dd58',
        'IsDropRequest': false,
        'IsPickupRequest': false,
        'JobID': 'job1',
        'Job': JobList,
        'Station': StationList,
        'StationID': 'station1',
        'Location': LocationList,
        'LocationID': 'location1',
        'dateFrom': '8/31/2017 8:15:00 AM',
        'dateTo': '8/31/2017 3:15:00 PM'
    }
];

/* Input value in base */

router.get('/', function (req, res, next) {

    for (var i = 0; i < UserList.length; i++) {
        var shifts = new Shifts({
            'ShiftID': ShiftList[i].ShiftID,
            'IsDropRequest': ShiftList[i].IsDropRequest,
            'IsPickupRequest': ShiftList[i].IsPickupRequest,
            'JobID': ShiftList[i].JobID,
            'Job': ShiftList[i].Job,
            'Station': ShiftList[i].Station,
            'StationID': ShiftList[i].StationID,
            'Location': ShiftList[i].Location,
            'LocationID': ShiftList[i].LocationID,
            'DateFrom': ShiftList[i].DateFrom,
            'DateTo': ShiftList[i].DateTo
        });

        shifts.save();

    }

    for (var i = 0; i < UserList.length; i++) {
        var user = new Users({
            login: UserList[i].login,
            password: UserList[i].password
        });

        user.save();

    }

    for (var i = 0; i < GroupList.length; i++) {
        var group = new Groups({
            ID: GroupList[i].ID,
            Description: GroupList[i].Description
        });

        group.save();

    }

    for (var i = 0; i < LocationList.length; i++) {
        var location = new Locations({
            ID: LocationList[i].ID,
            Description: LocationList[i].Description
        });

        location.save();

    }

    for (var i = 0; i < JobList.length; i++) {
        var job = new Jobs({
            ID: JobList[i].ID,
            Description: JobList[i].Description
        });

        job.save();

    }

    for (var i = 0; i < StationList.length; i++) {
        var station = new Stations({
            ID: StationList[i].ID,
            Description: StationList[i].Description
        });

        station.save();

    }

    Users.find({}, function (err, users) {
        console.log(users);
    })

});

/* logIn */

router.post('/login', function (req, res, next) {

    if (req.body.login === 'test@test.test') {
        var token = ',zsnfgv,nb,nb,xcnbz,cnbknbkznbkldzgkndbnklgbdnlkfnklmvz';
        res.status(201).json({
            Token: token,
            Success: 'true',
            message: 'Login success',
            Items: Login.Items,
            LocationList: Login.LocationList,
            StationList: Login.StationList,
            JobList: Login.JobList
        });
    }

    if (req.body.login === 'test1@test.test') {
        var token = ',zsnfdfhfmgdj,k.jl.fmdghnsnmjkhiylflugdlykfjhknlkfnklmvz';
        res.status(201).json({
            Token: token,
            Success: 'true',
            message: 'Login success',
            Items: Login.Items,
            LocationList: Login.LocationList,
            StationList: Login.StationList,
            JobList: Login.JobList
        });
    }

    if (req.body.login === 'test2@test.test') {
        var token = ',zsnfgccdccecsddsdsfdgxfnfukuo;ipkjfgukujhryjtyjhthryjynlkfnklmvz';
        res.status(201).json({
            Token: token,
            Success: 'true',
            message: 'Login success',
            Items: Login.Items,
            LocationList: Login.LocationList,
            StationList: Login.StationList,
            JobList: Login.JobList
        });
    }
});

module.exports = router;
