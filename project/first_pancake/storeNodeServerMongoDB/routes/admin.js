var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');

var Admin = require('../models/admin');

//registration

router.post('/', function (req, res, next) {
    var user = new Admin({
        firstName: req.body.firstName,
        lastName: req.body.firstName,
        password: bcrypt.hashSync(req.body.password, 13), //package for crypt - bcryptjs , 13 - its how strong will be password
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
        })
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
        var token = jwt.sign({user: admin}, 'secret key', {expiresIn: 7200}); // в начале передается юзер к которому привяжется,
        // потом секретный ключ, который участвует в создании токена, затем время которое этот ключ действителен
        res.status(201).json({
            message: 'User created',
            token: token,
            userId: user._id
        })
    });
});



module.exports = router;
