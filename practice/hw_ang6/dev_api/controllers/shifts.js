'use strict';
var faker = require('faker');

exports.get = {};
exports.post = {};

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

var ShiftList = [
    {
        'ShiftID': 'ba348365-08f6-4c0c-959d-9a1acbb46b09',
        'IsDropRequest': true,
        'IsPickupRequest': false,
        'JobID': JobList[0].ID,
        'Job': JobList[0].Description,
        'StationID': StationList[0].ID,
        'Station': StationList[0].Description,
        'LocationID': LocationList[0].ID,
        'Location': LocationList[0].Description,
        'DateFrom': faker.date.future(),
        'DateTo': faker.date.future()
    },
    {
        'ShiftID': '14f7d015-c105-40cc-8bb6-b7d19ac1dd58',
        'IsDropRequest': false,
        'IsPickupRequest': true,
        'JobID': JobList[0].ID,
        'Job': JobList[0].Description,
        'StationID': StationList[1].ID,
        'Station': StationList[1].Description,
        'LocationID': LocationList[2].ID,
        'Location': LocationList[2].Description,
        'DateFrom': '8/31/2017 7:40:00 AM',
        'DateTo': faker.date.future()
    },
    {
        'ShiftID': '22f7d015-c105-40cc-8bb6-b7d19ac1dd58',
        'IsDropRequest': false,
        'IsPickupRequest': false,
        'JobID': JobList[1].ID,
        'Job': JobList[1].Description,
        'StationID': StationList[3].ID,
        'Station': StationList[3].Description,
        'LocationID': LocationList[4].ID,
        'Location': LocationList[4].Description,
        'DateFrom': faker.date.future(),
        'DateTo': faker.date.future()
    },
    {
        'ShiftID': '33f7d015-c105-40cc-8bb6-b7d19ac1dd58',
        'IsDropRequest': true,
        'IsPickupRequest': true,
        'JobID': JobList[4].ID,
        'Job': JobList[4].Description,
        'StationID': StationList[2].ID,
        'Station': StationList[2].Description,
        'LocationID': LocationList[3].ID,
        'Location': LocationList[3].Description,
        'DateFrom': '2/31/2017 8:00:00 AM',
        'DateTo': '2018-12-17T23:50:16.446Z'
    },
    {
        'ShiftID': '44f7d015-c105-40cc-8bb6-b7d19ac1dd58',
        'IsDropRequest': false,
        'IsPickupRequest': false,
        'JobID': JobList[3].ID,
        'Job': JobList[3].Description,
        'StationID': StationList[1].ID,
        'Station': StationList[1].Description,
        'LocationID': LocationList[2].ID,
        'Location': LocationList[2].Description,
        'DateFrom': faker.date.future(),
        'DateTo': faker.date.future()
    },
    {
        'ShiftID': '55f7d015-c105-40cc-8bb6-b7d19ac1dd58',
        'IsDropRequest': false,
        'IsPickupRequest': false,
        'JobID': JobList[4].ID,
        'Job': JobList[4].Description,
        'StationID': StationList[2].ID,
        'Station': StationList[2].Description,
        'LocationID': LocationList[1].ID,
        'Location': LocationList[1].Description,
        'DateFrom': '8/31/2017 8:15:00 AM',
        'DateTo': faker.date.future()
    }
];

exports.get.upcoming = function (req, res, next) {
    var upcoming = [
        ShiftList[0], ShiftList[3], ShiftList[5], ShiftList[1]
    ];

    var locationList = [
        LocationList[0], LocationList[2], LocationList[3]
    ];

    var stationList = [
        StationList[0], StationList[1]
    ];

    var jobList = [
        JobList[0], JobList[1], JobList[2], JobList[3]
    ];
    setTimeout(function () {
        res.status(201).json({
            Token: faker.random.uuid(),
            Saccess: 'We are live!',
            Message: "All upcoming",
            Items: upcoming,
            LocationList: locationList,
            StationList: stationList,
            JobList: jobList
        });
    }, 1500);

}

exports.get.available = function (req, res, next) {
    var available = [
        ShiftList[1], ShiftList[2], ShiftList[5]
    ];

    var locationList = [
        LocationList[1], LocationList[4], LocationList[3]
    ];

    var stationList = [
        StationList[0], StationList[1], StationList[2], StationList[3]
    ];

    var jobList = [
        JobList[0], JobList[1], JobList[2], JobList[3]
    ];

    setTimeout(function () {
        res.status(201).json({
            Token: faker.random.uuid(),
            Saccess: 'We are live!',
            Message: "All available",
            Items: available,
            LocationList: locationList,
            StationList: stationList,
            JobList: jobList
        });
    }, 1500);

}

exports.get.myrequests = function (req, res, next) {
    var myrequests = [
        ShiftList[1], ShiftList[4], ShiftList[5], ShiftList[2]
    ];

    var locationList = [
        LocationList[1], LocationList[0], LocationList[2]
    ];

    var stationList = [
        StationList[0], StationList[1], StationList[2], StationList[3]
    ];

    var jobList = [
        JobList[0], JobList[1], JobList[2], JobList[3]
    ];

    setTimeout(function () {
        res.status(201).json({
            Token: faker.random.uuid(),
            Saccess: 'We are live!',
            Message: "All available",
            Items: myrequests,
            LocationList: locationList,
            StationList: stationList,
            JobList: jobList
        });
    }, 1500);

}
