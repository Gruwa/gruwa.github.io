'use strict';

import infoScript from './routes/infoScript'
import partnerScript from './routes/partnerScript'
import activityScript from './routes/activityScript'

require("jquery")
require("lodash")

let html = require('./../index.html')
let scss = require('./../style/style.scss')

infoScript()
partnerScript()
activityScript()
