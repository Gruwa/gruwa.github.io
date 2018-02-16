var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var User = require('./students');
var Lecturer = require('./lecturers');

var schema = new Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    password: {type: String},
    email: {type: String, required: true, unique: true},
    active: {type: Boolean},
    avatar: {type: String},
    created_date: {type: Date},
    user: [{type: Schema.Types.ObjectId, ref: 'User'}],
    lecturer: [{type: Schema.Types.ObjectId, ref: 'Lecturer'}]

});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Admins', schema);

