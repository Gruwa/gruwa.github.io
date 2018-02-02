'use strict';

var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

var Admin = require('../models/admin');

//validTokin

// router.use('/', function (req, res, next) {
//     console.log(req.headers.token)
//     jwt.verify(req.headers.token, 'secret Okey', function (err, result) {
//         if (err) {
//             return res.status(401).json({
//                 title: 'Not Authenticated',
//                 error: err
//             })
//         }
//         next();
//     })
// });

/* GET home page. */

router.get('/', function (req, res, next) {
    res.status(201).json({
        message: 'Get'
    });

});

//registration

router.post('/', function (req, res, next) {
    var user = new Admin({
        firstName: req.body.firstName,
        lastName: req.body.firstName,
        password: bcrypt.hashSync(req.body.password, 13),
        email: req.body.email
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
    Admin.findOne({email: req.body.email}, function (err, admin) {
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





module.exports = router;
