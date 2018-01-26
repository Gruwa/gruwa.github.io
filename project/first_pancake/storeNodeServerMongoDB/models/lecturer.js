var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var User = require('./user');

var schema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    avatar: {type: String},
    created_date: {type: Date},
    active: {type: Boolean},
    title: {type: String},
    companyName: {type: String},
    about: {type: String},
    user: [{type: Schema.Types.ObjectId, ref: 'User'}]

});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Lecturer', schema);
