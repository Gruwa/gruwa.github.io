'use strict';
var faker = require('faker');

exports.get = {};
exports.post = {};

var data = {
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
    //LocationList: [
    //    {ID: faker.random.uuid(), Description: faker.address.city()},
    //    {ID: faker.random.uuid(), Description: faker.address.city()},
    //    {ID: faker.random.uuid(), Description: faker.address.city()},
    //    {ID: faker.random.uuid(), Description: faker.address.city()},
    //    {ID: faker.random.uuid(), Description: faker.address.city()}
    //],
    //StationList: [
    //    {ID: faker.random.uuid(), Description: faker.random.words()},
    //    {ID: faker.random.uuid(), Description: faker.random.words()},
    //    {ID: faker.random.uuid(), Description: faker.random.words()},
    //    {ID: faker.random.uuid(), Description: faker.random.words()}
    //],
    //JobList: [
    //    {ID: faker.random.uuid(), Description: faker.random.words()},
    //    {ID: faker.random.uuid(), Description: faker.random.words()},
    //    {ID: faker.random.uuid(), Description: faker.random.words()},
    //    {ID: faker.random.uuid(), Description: faker.random.words()},
    //    {ID: faker.random.uuid(), Description: faker.random.words()},
    //    {ID: faker.random.uuid(), Description: faker.random.words()}
    //]
};

var login = function (req, res, next) {

    if (req.body.login === 'test@test.test') {
        var token = ',zsnfgv,nb,nb,xcnbz,cnbknbkznbkldzgkndbnklgbdnlkfnklmvz';

        setTimeout(function () {
            res.status(201).json({
                Token: token,
                //Success: 'true',
                //message: 'Login success',
                Items: data.Items,
                //LocationList: data.LocationList,
                //StationList: data.StationList,
                //JobList: data.JobList
            });
        }, 1500);
    }
    // else
    // if (req.body.login === 'test1@test.test') {
    //     var token = ',zsnfdfhfmgdj,k.jl.fmdghnsnmjkhiylflugdlykfjhknlkfnklmvz';
    //
    //     setTimeout(function () {
    //         res.status(201).json({
    //             Token: token,
    //             //Success: 'true',
    //             //message: 'Login success',
    //             Items: data.Items,
    //             //LocationList: data.LocationList,
    //             //StationList: data.StationList,
    //             //JobList: data.JobList
    //         });
    //     }, 1500);
    //
    // }
    // else
    // if (req.body.login === 'test2@test.test') {
    //     var token = ',zsnfgccdccecsddsdsfdgxfnfukuo;ipkjfgukujhryjtyjhthryjynlkfnklmvz';
    //
    //      setTimeout(function () {
    //         res.status(201).json({
    //             Token: token,
    //             //Success: 'true',
    //             //message: 'Login success',
    //             Items: data.Items,
    //             //LocationList: data.LocationList,
    //             //StationList: data.StationList,
    //             //JobList: data.JobList
    //         });
    //      }, 1500);
    //
    // }
    else
        res.sendStatus(401);
};

exports.get.login = login;
exports.post.login = login;
