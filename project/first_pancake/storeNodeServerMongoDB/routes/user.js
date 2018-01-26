var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');

// router.post('/', function (req, res, next) {
//     var user = new User({
//         firstName: req.body.firstName,
//         lastName: req.body.firstName,
//         password: bcrypt.hashSync(req.body.firstName, 13), //package for crypt - bcryptjs , 13 - its how strong will be password
//         email: req.body.firstName
//
//     });
//     user.save(function (err, result) {
//         if (err) {
//             return res.status(500).json({
//                 title: 'An error occurred',
//                 error: err
//             });
//         }
//         res.status(201).json({
//             message: 'User created',
//             obj: result
//         })
//     });
// });



module.exports = router;
