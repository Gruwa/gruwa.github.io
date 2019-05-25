'use strict';

exports.get = {};
exports.post = {};
exports.put = {};
exports.patch = {};
exports.delete = {};

var error = function (req, res, next) {

    setTimeout(function () {
        res.set('DC-Error-Code', '1001');
            res.status(500).json({
                "Errors": [
                    {
                        "Status": "What this field for? I have no any freaking idea!",
                        "Code": "Additional code in the body? Are you serious???",
                        "Title": "Some resonable error name",
                        "Detail": "Really useful description.",
                        "Parameter": "rmdcpassword - ??? Maybe there should be some valid password... o_0"
                    }
                ]
            });
        }, 1500);
};

exports.get['*'] = error;
exports.post['*'] = error;
