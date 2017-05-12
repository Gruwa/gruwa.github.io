'use strict';
const NODE_ENV = process.env.NODE_ENV || "development";

import google from './google';
import bxslider from './bxslider';
import myscript from './myscript'; // запись на ES6
// const myscript = require('./myscript'); // запись на ES5
import accordion from './accordion';
import template from './template';
// import defineplugin from './plugin/defineplugin';

exports.template = template;
exports.google = google;
exports.bxslider = bxslider;
exports.myscript = myscript;
exports.accordion = accordion;

// defineplugin();
google();
bxslider();
myscript();
accordion();
