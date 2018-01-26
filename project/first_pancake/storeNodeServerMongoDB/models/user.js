var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var Address = require('./address');
var Lecturer = require('./lecturer');

var schema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    avatar: {type: String},
    created_date: {type: Date},
    active: {type: Boolean},
    address: [{type: Schema.Types.ObjectId, ref: 'Address'}],
    lecturer: [{type: Schema.Types.ObjectId, ref: 'Lecturer'}]

});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', schema);
