var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
    login: {type: String},
    Password: {type: String},
    Name: {type: String},
    LastName: {type: String},
    Email: {type: String},
    Phone: {type: String}
});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Users', schema);

