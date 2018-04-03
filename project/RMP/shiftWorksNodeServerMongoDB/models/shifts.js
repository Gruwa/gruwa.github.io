var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
    'ShiftID': {type: String},
    'IsDropRequest': {type: Boolean},
    'IsPickupRequest': {type: Boolean},
    'JobID': {type: String},
    'Job': {type: Array},
    'Station': {type: Array},
    'StationID': {type: String},
    'Location': {type: Array},
    'LocationID': {type: String},
    'DateFrom': {type: Date},
    'DateTo': {type: Date}
});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Shifts', schema);

