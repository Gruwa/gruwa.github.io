var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
    'ShiftTitle': {type: String},
    'ShiftID': {type: String},
    'IsDropRequest': {type: Boolean},
    'IsPickupRequest': {type: Boolean},
    'JobID': {type: String},
    'Job': {type: String},
    'Station': {type: String},
    'StationID': {type: String},
    'Location': {type: String},
    'LocationID': {type: String},
    'DateFrom': {type: Date},
    'DateTo': {type: Date}
});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Shifts', schema);

