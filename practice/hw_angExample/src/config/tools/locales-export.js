'use strict';
var _ = require('lodash');
var flat = require('flat');
var csv = require('json2csv');
var path = require('path');
var fs = require('fs');

function list(val) {
  return _.filter(val.split(/[, \t]/), (item) => !_.isEmpty(item));
}

var program = require('commander')
  .option('-l, --languages <languages>', "Languages to export", list)
  .option('-i, --inputDir <dir>', "A directory with language files")
  .option('-t, --type <type>', 'A file type CSV or TSV. TSV is default')
  .option('-o, --outputDir <dir>', 'A directory for the output file');


program.on('--help', function() {
  console.log('  Examples:');
  console.log('');
  console.log(`    $ npm run locales:export`);
  console.log(`    $ npm run locales:export -- -t 'csv'`);
  console.log(`    $ npm run locales:export -- -o ./translations/`);
  console.log(`    $ npm run locales:export -- -l 'zh-cn, de-de'`);
  console.log('');
});

program.parse(process.argv);

var locales = require('../../core/services/locale/locales.json');
var allLanguages = _.without(_.map(locales, 'id'), 'en-us');
var LOCALES_DIR = !_.isEmpty(program.inputDir) ? path.resolve(program.inputDir) : '../../core/i18n/';
// delimit by tab since it's more stable format
var DELIMITER = !_.isEmpty(program.type) &&  program.type.toLowerCase() === 'csv' ? ',' : '\t';
// list of languages to process
var LANGUAGES = !_.isEmpty(program.languages) ? _.intersection(allLanguages, program.languages) : allLanguages;
var OUTPUT_DIR = !_.isEmpty(program.outputDir) ? program.outputDir : './';

if (_.isEmpty(LANGUAGES)) {
  console.log('Please specify at least one language');
  process.exit(1);
}

/**
 * Prepare intermediate structure
 * [
 *   {
 *     'global.default_title': { 'en-us': 'Cadreon Unity' },
 *     'global.yes': { 'en-us': 'Yes' }
 *      // ...
 *   },
 *   {
 *     'global.default_title': { 'de-de': 'Cadreon Unity' },
 *     'global.yes': { 'de-de': 'Ja' }
 *      // ...
 *   },
 * ]
 *
 * @type {Array}
 */

var flattenKey2Label = [...LANGUAGES, 'en-us'].map(lang => {
  var langDictionary = {};
  try {
    langDictionary = require(path.join(LOCALES_DIR, lang + '.json'));
  } catch (e) {
    console.warn("WARN There is no language file for ", lang);
  }
  return _(flat(langDictionary)).mapValues(val => ({ [lang]: val })).value();
});

/**
 * Compose one big object with single key an multiple values for each locale
 * {
 *   "navbar.user_menu.logout": {
 *     "en-us": "Log Out",
 *     "zh-ch": "登出",
 *     "de-de": "Ausloggen"
 *   }
 * }
 */
var initial = {};
[...LANGUAGES, 'en-us'].forEach(_.partial(_.set, initial, _, ''));
var unifiedDic = _.mapValues(
  _.merge.apply(null, [{}].concat(flattenKey2Label)),
  val => _.defaults(val, initial)
);

// sort languages: en-us first
var langKeySortValue = landKeyValuePair => landKeyValuePair[0] !== 'en-us';

// flush out to FS
_.each(LANGUAGES, lang => {

  /**
   * Compose rows to be exported to TSV (tabs separated file)
   *
   * [KEY, EN-US, ZH-CN]
   *
   * @type {Array}
   */
  let data = _(unifiedDic)
    .mapValues(el => _(el).pick(['en-us', lang]).toPairs().sortBy(langKeySortValue).map(1).value())
    .toPairs()
    .map(_.flatten)
    .value();

  // prepare headers
  let fields = ['key'].concat('en-us').concat(lang).map((header, i) => ({ label: header, value: i.toString() }));

  // opts for json2csv library
  let opts = {
    data,
    fields,
    del: DELIMITER
  };

  fs.writeFileSync(path.join(OUTPUT_DIR, lang + (DELIMITER === '\t' ? '.tsv' : '.csv')), csv(opts));
});

