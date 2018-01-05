// Прототип реального приложения
//
// 1. получают запросы
//
// 2. выдают ответы на них

var http = require('http');
var url = require('url');

var server = new http.Server(function (req, res) {
    console.log(req.method, req.url);

    var urlParsed = url.parse(req.url, true); // параметр true разберет строку на обекты
    console.log(urlParsed);
    debugger;

    if (urlParsed.pathname = 'echo' && urlParsed.query.message) {
        res.end(urlParsed.query.message);
        debugger;
    } else {
        res.statusCode = 404;
        res.end("Page not found");
    }
});

server.listen(1337, '127.0.0.1'); // вызов метода http. Отвечающего за адресс и порт
console.log("Vse rabotaet");
