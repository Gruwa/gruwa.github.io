import * as moment from 'moment';
import {getCustomLocale} from '../../utils/locale';

export interface ILocale {
  id: string;
  title: string;
  grouping: string;
  decimal: string;
}

export interface ILanguage {
  id: string;
  select2: string; // translation file for select2(4)
  title: string;
}

export interface IGrouping {
  id: string;
  title: string;
}

export interface IDecimal {
  id: string;
  title: string;
}

const DEFAULT_TRANSLATION = 'en-us';
const DEFAULT_LOCALE = 'en-us';

export class LocaleService {
  languages: ILanguage[] = [];
  locales: ILocale[] = [];
  groupings: IGrouping[] = [];
  decimals: IDecimal[] = [];

  private cacheLocales: ng.ILocaleService[] = [];

  constructor(
    private $locale: ng.ILocaleService,
    private $window: ng.IWindowService,
    private $log: ng.ILogService,
    private $translate: ng.translate.ITranslateService
  ) {
    'ngInject';

    this.languages = require('./locales.json');
    this.locales = require('./locales-view.json');

    // Todo: Localization
    this.groupings = [
      {
        id: ',',
        title: ','
      },
      {
        id: '.',
        title: '.'
      },
      {
        id: '\u00a0',
        title: 'Space'
      },
      {
        id: '\'',
        title: '\''
      },
      {
        id: '',
        title: 'None'
      },
      {
        id: '\u066c',
        title: '\u066c'
      }
    ];

    this.decimals = [
      {
        id: ',',
        title: ','
      },
      {
        id: '.',
        title: '.'
      },
      {
        id: '\u066b',
        title: '\u066b'
      }
    ];
  }

  getDefaultLanguage() {
    return _.find(this.languages, {id: DEFAULT_TRANSLATION});
  }

  getDefaultLocale() {
    return _.find(this.locales, {id: DEFAULT_LOCALE});
  }

  getDefaultGrouping(locale: ILocale): IGrouping {
    if (!locale) {
      return;
    }
    return _.find(this.groupings, {id: locale.grouping});
  }

  getDefaultDecimal(locale: ILocale): IDecimal {
    if (!locale) {
      return;
    }
    return _.find(this.decimals, {id: locale.decimal});
  }

  getLocaleById(id: string): ILocale {
    return _.find(this.locales, {id});
  }

  getLocaleBasedByBrowser(): ILocale {
    // A string representing the language version as defined in BCP 47.
    // Examples of valid language codes include "en", "en-US", "fr", "es-ES", etc.
    // http://www.techrepublic.com/article/detect-foreign-language-support-using-javascript/
    let language = _.get<ng.IWindowService, string>(this.$window, 'navigator.languages[0]') ||
      _.get<ng.IWindowService, string>(this.$window, 'navigator.language') ||
      _.get<ng.IWindowService, string>(this.$window, 'navigator.userLanguage') ||
      _.get<ng.IWindowService, string>(this.$window, 'navigator.browserLanguage') ||
      _.get<ng.IWindowService, string>(this.$window, 'navigator.systemLanguage');

    if (!language || !_.isString(language)) {
      return null;
    }

    language = language.toLowerCase();

    return _.find(this.locales, (locale: ILocale) => {
      return _.startsWith(locale.id, language);
    });
  }

  getLanguageById(id: string): ILanguage {
    return _.find(this.languages, {id});
  }

  getGroupingById(id: string): IGrouping {
    return _.find(this.groupings, {id});
  }

  getDecimalById(id: string): IDecimal {
    return _.find(this.decimals, {id});
  }

  applyUserPreferences(language: ILanguage, locale: ILocale, grouping: IGrouping, decimal: IDecimal) {
    this.updateLanguage(language.id);
    this.updateLocale(locale.id);
    this.updateGrouping(grouping.id);
    this.updateDecimal(decimal.id);
  }

  updateLocale(name: string) {
    let cachedLocale = _.find(this.cacheLocales, {id: name});
    let localeFile = 'angular-locale_' + name;

    if (!cachedLocale) {
      try {
        require('angular-i18n/' + localeFile);
      } catch (e) {
        this.$log.error(`Can't load user locale ${name}`);
        require('angular-i18n/en-us');
      }
      let localInjector = angular.injector(['ngLocale']);
      cachedLocale = <ng.ILocaleService> localInjector.get('$locale');
      this.cacheLocales.push(cachedLocale);
    }

    this.overrideValues(this.$locale, cachedLocale);

    this.updateMomentLocale(name);
  }

  updateGrouping(grouping: string) {
    this.$locale.NUMBER_FORMATS.GROUP_SEP = grouping;
  }

  updateDecimal(decimal: string) {
    this.$locale.NUMBER_FORMATS.DECIMAL_SEP = decimal;
  }

  private updateLanguage(languageId: string) {
    this.$translate.use(languageId);
  }

  // function that copy newObject to oldObject without changing link
  private overrideValues(oldObject, newObject) {
    angular.forEach(oldObject, (value, key) => {
      if (!newObject[key]) {
        delete oldObject[key];
      } else if (angular.isArray(newObject[key])) {
        oldObject[key].length = newObject[key].length;
      }
    });
    angular.forEach(newObject, (value, key) => {
      if (angular.isArray(newObject[key]) || angular.isObject(newObject[key])) {
        if (!oldObject[key]) {
          oldObject[key] = angular.isArray(newObject[key]) ? [] : {};
        }
        this.overrideValues(oldObject[key], newObject[key]);
      } else {
        oldObject[key] = newObject[key];
      }
    });
  }

  private updateMomentLocale(name: string) {
    moment.locale(name);
    // customize moment locale
    moment.updateLocale(moment.locale(), getCustomLocale(this.$locale));
  }

}
