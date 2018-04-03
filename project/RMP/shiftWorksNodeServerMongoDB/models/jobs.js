var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
    ID: {type: String},
    Description: {type: String}
});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Jobs', schema);

