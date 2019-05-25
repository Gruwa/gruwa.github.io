const express = require('express'),
  bodyParser = require('body-parser'),
  app = express(),
  port = process.env.PORT || 3000; 

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
  
const routes = require('./routes'); //importing route
routes(app); //register the route

app.listen(port);

console.log('Shiftworks local API server started on: ' + port);
