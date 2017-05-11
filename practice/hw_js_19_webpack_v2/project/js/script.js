'use strict';

import google from './google';
const template = require('./template'); // запись на ES5
import myscript from './myscript'; // запись на ES6
import bxslider from './bxslider';

google('script');
template('script');
myscript('script');
bxslider('script');

exports.google = google;
exports.template = template;
exports.myscript = myscript;
exports.bxslider = bxslider;
