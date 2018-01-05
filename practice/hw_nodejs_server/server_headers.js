
var http = require('http');
var url = require('url');

var server = new http.Server(function (req, res) {
    console.log(req.headers);

    var urlParsed = url.parse(req.url, true); // параметр true разберет строку на обекты


    if (urlParsed.pathname = '/echo' && urlParsed.query.message) {
        //---------------------------------- не явный способ объявление заголовков
        //res.statusCode = 200; // статус 200 называется ОК, говорит о том,
                                // что страница сгенерирована нормально
        res.setHeader('Cache-control', 'no-cashe'); // добавляет заголовок
        // конкретно в этом случае благодаря Cache-control заголовку в ответе сервера
                                                // ответы сервера не будут кешироваться в браузере
        // res.removeHeader() // удаляет заголовок
        // ! важно при res.setHeader и Cache-control не сразу будут отправлены а только когда дойдет до res.end


        //-------------------- явный способ объявления заголовков
        //иногда такой тоже нужен
        //res.writeHead(200, "OK", {'Cache-control': 'no-cashe'});
        //-----------------------
        res.end(urlParsed.query.message);
    } else {
        res.statusCode = 404; // статус 404 называется "Страница не найдена"
        res.end("Page not found");
    }
});

server.listen(1337, '127.0.0.1'); // вызов метода http. Отвечающего за адресс и порт
