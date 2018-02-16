var express = require('express');
var router = express.Router();
var dockerCommandsRepository = require('../lib/dockerCommandsRepository');

var Students = require('../models/students');
var Admins = require('../models/admins');
var Lecturers = require('../models/lecturers');

var _students, _admins, _lecturers;

/* GET amount of users. */
router.get('/chart', function(req, res, next) {

    Students.find({}, function (err, users) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!users) {
            return res.status(401).json({
                title: 'No one user in base',
                error: {message: 'Invalid login credentials'}
            });
        }

        _students = users.length+'';

        Admins.find({}, function (err, users) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            if (!users) {
                return res.status(401).json({
                    title: 'No one user in base',
                    error: {message: 'Invalid login credentials'}
                });
            }

            _admins = users.length+'';

            Lecturers.find({}, function (err, users) {
                if (err) {
                    return res.status(500).json({
                        title: 'An error occurred',
                        error: err
                    });
                }
                if (!users) {
                    return res.status(401).json({
                        title: 'No one user in base',
                        error: {message: 'Invalid login credentials'}
                    });
                }

                _lecturers = users.length+'';

                res.status(201).json({
                    message: "All users",
                    students: _students,
                    admins: _admins,
                    lecturers: _lecturers
                });
            });
        });
    });
});

module.exports = router;
