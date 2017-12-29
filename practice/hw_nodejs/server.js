var db = require('db');
db.connect();

var User = require('./user');

function run() {

let vasya = new User('Vasya');
let petya = new User('Petya');

vasya.hello(petya);

console.log(db.getPhrase("Run OK"));
}

if (module.parent) {
    exports.run = run;
} else {
    run();
}