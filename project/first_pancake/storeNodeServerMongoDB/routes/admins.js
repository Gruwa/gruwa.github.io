'use strict';

var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

var Admins = require('../models/admins');

/* GET all admins */

router.get('/', function(req, res, next) {
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

        res.status(201).json({
            message: "All admins",
            users: users
        });

    });
});

/* registration */

router.post('/', function (req, res, next) {
    var user = new Admins({
        first_name: req.body.first_name,
        last_name: req.body.first_name,
        password: bcrypt.hashSync(req.body.password, 13),
        email: req.body.email,
        active: true,
        created_date: new Date()
    });

    user.save(function (err, result) {
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
});

// logIn

router.post('/signin', function (req, res, next) {
    Admins.findOne({email: req.body.email}, function (err, admin) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!admin) {
            return res.status(401).json({
                title: 'Login failed',
                error: {message: 'Invalid login credentials'}
            });
        }
        if (!admin.active) {
            return res.status(401).json({
                title: 'Login failed',
                error: {message: 'Admin is nonactive'}
            });
        }
        if (!bcrypt.compareSync(req.body.password, admin.password)) { // пароли зашифрованы потому сравнить их не можем,
            // но мы можем сравнить их хеши, если хеш совпадают то пароли идентичны
            return res.status(401).json({
                title: 'Login failed',
                error: {message: 'Invalid login credentials'}
            });
        }
        var token = jwt.sign({user: admin}, 'secret Okey', {expiresIn: '1h'}); // в начале передается юзер к которому привяжется,
        // потом секретный ключ, который участвует в создании токена, затем время которое этот ключ действителен
        res.status(201).json({
            message: 'Login success',
            token: token,
            userId: admin._id,
            admin: admin
        })
    });
});

//admin status

router.post('/status', function (req, res, next) {
    Admins.findOne({_id: req.body._id}, function (err, user) {
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

//user delete

router.delete('/delete/:userId', function (req, res, next) {
    Admins.findOneAndRemove({_id: req.params['userId']}, function (err, user) {
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

//check availability admin

router.get('/email/:userEmail', function (req, res, next) {
    Admins.findOne({email: req.params['userEmail']}, function (err, user) {
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

//edit admin

router.patch('/edit/:userEmail', function (req, res, next) {
    Admins.findOne({email: req.params['userEmail']}, function (err, user) {
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
