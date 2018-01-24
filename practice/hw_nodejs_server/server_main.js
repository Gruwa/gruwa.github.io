var http = require('http');

var server = new http.Server(); //декларация сервераю он является EventEmitter-ом
                                // и все события входящие (запросы)
// http.Server -> net.Server -> EventEmitter - это наследование филдов http Server-om
server.listen(1337, '127.0.0.1'); // вызов метода http. Отвечающего за адресс и порт

server.on('request', function (req, res) { // req - обект запроса,включает урл входящего запросаю.
    // res - объект ответа, в него пишется
    res.end('Eto Server');

server.get('/users', function (req, res) {
    res.json([
        {
            "results": [
                {"id":"47e7b34b-bc86-405a-9afd-c22fbf05a23e","vendor":"d56806a3-a6a2-4292-ad7c-cdc40b0371e5","user":{"id":18,"avatar":"https://learnster-dev.s3.amazonaws.com/users/18/avatar/aaron_TgTcu4k.jpg?AWSAccessKeyId=AKIAJNVKGCHPPFM4ZWVA&Signature=5Yvo0FrU8%2BfKjykhqQaboYtIUU0%3D&Expires=1516639133","first_name":"Akron","last_name":"Clastaneda","email":"aaron.castaneda@gmail.com","address":{"id":"b5d1e26d-b42f-45b5-b913-9aea3cf4041a","city":"Stockholm","country":null},"title":"Project Management","company_name":"","about":"This is a short description of myself.\nThis is a short description of myself.\nThis is a short description of myself.\nThis is a short description of myself.\nThis is a short description of myself."},"active":true,"created_date":"2018-01-14T15:53:48.778280Z"},{"id":"9f1b14ea-6f8c-4d1a-a577-997a19eb6b69","vendor":"d56806a3-a6a2-4292-ad7c-cdc40b0371e5","user":{"id":16,"avatar":null,"first_name":"Christopher","last_name":"Columbus","email":"test@learnster.com","address":{"id":"d0c42ff5-1b6c-4841-af6f-137a7c687456","city":"London","country":null},"title":"Super student","company_name":null,"about":""},"active":true,"created_date":"2018-01-09T17:02:24.534786Z"},{"id":"13037d97-b9ac-4abc-ae4f-588d61e963e8","vendor":"d56806a3-a6a2-4292-ad7c-cdc40b0371e5","user":{"id":17,"avatar":null,"first_name":"Max","last_name":"Seredenko","email":"max.seredenko@gmail.com","address":null,"title":null,"company_name":"","about":null},"active":true,"created_date":"2018-01-12T12:53:42.946608Z"}
            ]
        }
    ]);
});

});
