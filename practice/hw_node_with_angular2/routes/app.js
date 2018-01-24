var express = require('express');
var router = express.Router();
var User = require('../models/user');

// router.get('/', function (req, res, next) {
//     res.render('index');
// });

router.get('/', function (req, res, next) {
    res.render('node');
});

router.post('/', function (req, res, next) {
    var email = req.body.email;
    var user = new User({
        firstName: 'MAx',
        lastNAme: 'Zaza',
        password: 'sexret',
        email: email

    });
    user.save(function (err, result) { // возвращает ошибку или результат, тут можно обработать

    }); // говорит нмангусту положить в базу юзера
    res.redirect('/');
});
module.exports = router;
