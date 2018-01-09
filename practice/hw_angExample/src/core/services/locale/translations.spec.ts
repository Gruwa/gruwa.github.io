import {compareTranslations} from '../../utils/translation-check';
import {ILanguage} from './locale.service';

describe('check translations', () => {
  let locales: ILanguage[] = require('../locale/locales.json');

  let enUs = require('../../i18n/en-us.json');
  _.each(_.filter(locales, (locale: ILanguage) => locale.id !== 'en-us'), (locale) => {
    let language = require('../../i18n/' + locale.id);

    it(`there should not be extra keys in ${locale.title} (${locale.id}) translation compare to en-us`, () => {
      compareTranslations(enUs, language, expect);
    });
  });
});
