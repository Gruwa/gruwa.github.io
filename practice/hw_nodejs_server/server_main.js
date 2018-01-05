var http = require('http');

var server = new http.Server(); //декларация сервераю он является EventEmitter-ом
                                // и все события входящие (запросы)
// http.Server -> net.Server -> EventEmitter - это наследование филдов http Server-om
server.listen(1337, '127.0.0.1'); // вызов метода http. Отвечающего за адресс и порт

server.on('request', function (req, res) { // req - обект запроса,включает урл входящего запросаю.
    // res - объект ответа, в него пишется
    res.end('Eto Server');
});