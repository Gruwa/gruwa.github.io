'use strict';

import google from './google';
import bxslider from './bxslider';
import myscript from './myscript'; // запись на ES6
// const myscript = require('./myscript'); // запись на ES5
import accordion from './accordion';
import template from './template';
// const UglifyJSPlugin = require('./UglifyJSPlugin');

google();
bxslider();
myscript();
accordion();
// UglifyJSPlugin();

exports.template = template;
exports.google = google;
exports.bxslider = bxslider;
exports.myscript = myscript;
exports.accordion = accordion;
