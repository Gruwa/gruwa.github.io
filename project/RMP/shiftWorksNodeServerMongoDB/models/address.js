var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = require('./students');

var schema = new Schema({
    city: {type: String},
    country: {type: String},
    user: [{type: Schema.Types.ObjectId, ref: 'User'}]

});

module.exports = mongoose.model('Address', schema);