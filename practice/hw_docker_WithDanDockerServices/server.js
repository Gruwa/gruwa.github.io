'use strict';

//3rd Party Modules

var express                 = require('express'),
    exphbs                  = require('express-handlebars'),
    hbsHelpers              = require('handlebars-helpers'),
    compression             = require('compression'),
    morgan                  = require('morgan'),
    bodyParser              = require('body-parser'),
    cookieParser            = require('cookie-parser'),
    session                 = require('cookie-session'),
    csurf                   = require('csurf'),
    favicon                 = require('serve-favicon'),
    //fs                      = require('fs'),

//Local Modules

    customExpressHbsHelpers = require('./lib/hbsHelpers/expressHbsHelpers'),
    db                      = require('./lib/database'),
    redisClient             = require('./lib/redisClient'),
    productTypeRepository   = require('./lib/productTypeRepository'),
    routes                  = require('./routes/router.js'),
    port                    = process.env.PORT || 8080,
    app                     = express(),
    config                  = require('./lib/configLoader');

//*************************************************
//        Handlebars template registration
//*************************************************

var hbs = exphbs.create({
    extname: '.hbs',
    defaultLayout: 'master',
    helpers: customExpressHbsHelpers
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
//Add custom handlebars template helper functionality
hbsHelpers.register(hbs.handlebars, {});

//*************************************************
//           Middleware and other settings
//*************************************************
app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(express.static(__dirname + '/public'));
//app.use(compression()); //Compression done via nginx

//Logging
//var  accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'});
//app.use(morgan('dev', {stream: accessLogStream}));
app.use(morgan('dev'));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    keys: ['some*key']
}));
app.use(csurf());

//************************************
// Custom middleware injection
//************************************

//Handle product types being passed with every response
app.use(productTypeRepository.injectProductTypes);

//Pass database config settings
db.init(config.databaseConfig);

//Pass redis config settings
redisClient.connect();

//Handle each request and ensure proper locals are set that are needed by app
app.use(function(req, res, next) {
    res.locals._csrf = req.csrfToken();
    if (req.query.searchtext) {
        res.locals.searchtext = req.query.searchtext;
    }
    res.locals.encodedUrl = encodeURIComponent(req.protocol + '://' + req.get('host') + req.originalUrl);

    next();
});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.send(500, { message: err.message });
});

process.on('uncaughtException', function(err) {
    if (err) console.log(err, err.stack);
});


//*********************************************************
//        Ensure DB gets closed when SIGINT called
//*********************************************************

if (process.platform === "win32") {
    require("readline").createInterface({
        input: process.stdin,
        output: process.stdout
    }).on("SIGINT", function () {
        console.log('SIGINT: Closing MongoDB connection');
        db.close();
        redisClient.close();
    });
}

process.on('SIGINT', function() {
    console.log('SIGINT: Closing MongoDB connection');
    db.close();
    redisClient.close();
});

//*********************************************************
//    Convention based route loading 
//*********************************************************
routes.load(app, './controllers');

//Handle any routes that are unhandled and return 404
app.use(function(req, res, next) {    
    var err = new Error('Not Found');    
    err.status = 404;    
    res.render('errors/404', err);
});


app.listen(port, function (err) {
    console.log('[%s] Listening on http://localhost:%d', process.env.NODE_ENV, port);
});





//*********************************************************
//    Quick and dirty way to detect event loop blocking
//*********************************************************
var lastLoop = Date.now();

function monitorEventLoop() {
    var time = Date.now();
    if (time - lastLoop > 1000) console.error('Event loop blocked ' + (time - lastLoop));
    lastLoop = time;
    setTimeout(monitorEventLoop, 200);
}

if (process.env.NODE_ENV === 'development') {
    monitorEventLoop();
}




