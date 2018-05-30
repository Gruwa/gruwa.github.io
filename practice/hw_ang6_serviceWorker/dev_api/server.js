var express = require('express');

//var cacheControl = require('express-cache-controller');

var path = require('path');

var send = require('send')



const PORT = process.env.PORT || 4000

const DIST_DIR = path.join(__dirname, 'dist')

const app = express();



app.get('*.*', express.static(DIST_DIR))

app.get('*', (req, res) => {

  var stream = send(req, "/index.html", { root: path.join(DIST_DIR, req.path) });

  stream.pipe(res);

})

//app.use(cacheControl({ maxAge: 60} ));



app.listen(PORT, () => {

  console.log(`App listening on port ${PORT}`)

});
