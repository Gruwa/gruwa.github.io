'use strict';

import google from './google';
import bxslider from './bxslider';
import myscript from './myscript'; // запись на ES6
const template = require('./template'); // запись на ES5

template('script');
google('script');
bxslider('script');
myscript('script');

exports.google = google;
exports.bxslider = bxslider;
exports.myscript = myscript;
exports.template = template;
