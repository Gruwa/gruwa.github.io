var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var User = require('./students');

var schema = new Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    password: {type: String},
    email: {type: String, required: true, unique: true},
    avatar: {type: String},
    created_date: {type: Date},
    active: {type: Boolean},
    title: {type: String},
    company_name: {type: String},
    about_me: {type: String},
    user: [{type: Schema.Types.ObjectId, ref: 'User'}]

});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Lecturers', schema);
