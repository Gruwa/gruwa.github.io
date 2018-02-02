var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var User = require('./user');
var Lecturer = require('./lecturer');

var schema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    avatar: {type: String},
    createdDate: {type: Date},
    user: [{type: Schema.Types.ObjectId, ref: 'User'}],
    lecturer: [{type: Schema.Types.ObjectId, ref: 'Lecturer'}]

});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Admin', schema);

