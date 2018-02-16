var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var Address = require('./address');
var Lecturer = require('./lecturers');

var schema = new Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    password: {type: String},
    title: {type: String},
    company_name: {type: String},
    about_me: {type: String},
    email: {type: String, required: true, unique: true},
    avatar: {type: String},
    created_date: {type: Date},
    active: {type: Boolean},
    address: [{type: Schema.Types.ObjectId, ref: 'Address'}],
    lecturer: [{type: Schema.Types.ObjectId, ref: 'Lecturer'}]

});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Students', schema);
