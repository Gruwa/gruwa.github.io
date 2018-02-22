var express = require('express');
var router = express.Router();

var Lecturers = require('../models/lecturers');

/* get all student */

router.get('/', function(req, res, next) {
    Lecturers.find({}, function (err, users) {
        console.log(users);
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
        res.status(201).json({
            message: "All lecturers",
            users: users
        });
    });
});

/* registration */

router.post('/', function (req, res, next) {
    console.log(req.body)

    Lecturers.findOne({email: req.body.user.email}, function (err, user) {
        if(user) {
            user = req.body.user;
            console.log(user)
            user.save(function (err, result) {
                if (err) {
                    return res.status(500).json({
                        title: 'An error occurred',
                        error: err
                    });
                }
                res.status(201).json({
                    message: 'User save'
                });
            });
        } else {
            var lecturer = new Lecturers({
                first_name: req.body.user.first_name,
                last_name: req.body.user.last_name,
                // password: bcrypt.hashSync(req.body.password, 13),
                email: req.body.user.email,
                title: req.body.user.title,
                about_me: req.body.user.about,
                active: true,
                created_date: new Date(),
                // address: { city: req.body.user.address.city },
                // address: { country: req.body.user.address.country },
                company_name: req.body.user.company_name
            });

            lecturer.save(function (err, result) {
                if (err) {
                    return res.status(500).json({
                        title: 'An error occurred',
                        error: err
                    });
                }
                res.status(201).json({
                    message: 'User created',
                    obj: result
                });
            });
        }
    });
});


/* lecturer status */

router.post('/status', function (req, res, next) {
    Lecturers.findOne({_id: req.body._id}, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!user) {
            return res.status(401).json({
                title: 'Student failed',
                error: {message: 'Invalid login credentials'}
            });
        }

        user.active = req.body.active;
        user.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(201).json({
                message: 'Status active change'
            });
        });
    });
});

/* user delete */

router.delete('/delete/:userId', function (req, res, next) {
    Lecturers.findOneAndRemove({_id: req.params['userId']}, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!user) {
            return res.status(401).json({
                title: 'Student failed',
                error: {message: 'Invalid login credentials'}
            });
        }
        res.status(201).json({
            message: 'User was delete'
        });

    });
});


/* check availability lecturer */

router.get('/email/:userEmail', function (req, res, next) {
    Lecturers.findOne({email: req.params['userEmail']}, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!user) {
            return res.status(401).json({
                title: 'Student failed',
                error: {message: 'Invalid login credentials'}
            });
        }
        res.status(201).json({
            message: 'Student was found'
        });
    });
});

/* edit lecturer */

router.patch('/edit/:userEmail', function (req, res, next) {
    Lecturers.findOne({email: req.params['userEmail']}, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!user) {
            return res.status(401).json({
                title: 'Student failed',
                error: {message: 'Invalid login credentials'}
            });
        }

        user.first_name = req.body.user.first_name;
        user.last_name = req.body.user.last_name;
        user.company_name = req.body.user.company_name;
        user.about_me = req.body.user.about_me;
        user.email = req.body.user.email;
        user.title = req.body.user.title;
        user.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(201).json({
                message: 'User Save'
            });
        });
    });
});

module.exports = router;
