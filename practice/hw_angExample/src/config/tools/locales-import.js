'use strict';
var _ = require('lodash');
var path = require('path');
var fs = require('fs');
var os = require('os');
var isUtf8 = require('is-utf8');

var program = require('commander')
  .option('-i, --inputDir <dir>', "A directory with language files")
  .option('-t, --type <type>', 'A file type CSV or TSV. TSV is default')
  .option('-f, --file <file>', 'A file to import')
  .option('-e, --english', 'Flag. If given then the tool will also import en-us language. Disabled by default');

program.on('--help', function() {
  console.log('  Examples:');
  console.log('');
  console.log(`    $ npm run locales:import -- -f zh-ch.csv`);
  console.log('');
});

program.parse(process.argv);

// dir with stored language fiels
var LOCALES_DIR = !_.isEmpty(program.inputDir) ? path.resolve(program.inputDir) : path.resolve('src/core/i18n/');
// delimit by tab since it's more stable format
var DELIMITER = !_.isEmpty(program.type) &&  program.type.toLowerCase() === 'csv' ? ',' : '\t';

if (_.isEmpty(program.file)) {
  console.log('Please specify file with translation to import');
  process.exit(1);
}

var INPUT_FILE = path.resolve(program.file);

// supported languages
var languages = require('../../core/services/locale/locales.json');

var Converter = require("csvtojson").Converter;
var converter = new Converter({
  delimiter: DELIMITER
});

/**
 * Process parsed CSV(TSV) file and saves it to locales dir
 * @param err
 * @param rows
 */
function processRows(err, rows) {
  if (err) {
    throw err;
  }

  var langKeys = languages.map(lang => lang.id);
  // this object will keep normalized structure
  var langKeyToObject = _.zipObject(langKeys, langKeys.map(e => ({})));

  // iterate over each row where
  // row is translation key to mapping object: language key to value
  _.each(rows, row => {
    _.each(langKeyToObject, (langObj, langKey) => {
      var rawValue = row[langKey];
      var value = String(rawValue);
      // skip nulls and undefined, also skip empty strings
      if (!_.isNil(rawValue) && !_.isEmpty(value)) {
        _.setWith(langObj, row.key.split('.').map(String), value, Object);
      }
    });
  });

  // write to FS
  _.each(langKeyToObject, (langObj, langKey) => {
    if (langKey === 'en-us' && !program.english) {
      // do not import en-us by default
      return;
    }
    if (!_.isEmpty(langObj)) {
      var localFilePath = path.join(LOCALES_DIR, langKey + '.json');
      fs.writeFileSync(localFilePath, JSON.stringify(langObj, null, 2) + os.EOL);
    }
  });
}


var fileContent = fs.readFileSync(INPUT_FILE);

if (!isUtf8(fileContent)) {
  console.log('The file is not utf-8 encoded');
  process.exit(1);
}

converter.fromString(fileContent.toString('utf8'), processRows);
