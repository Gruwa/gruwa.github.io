import * as moment from 'moment';

export default (ngModule) => {
  describe(ngModule.name, () => {
    beforeEach(angular.mock.module(ngModule.name));

    describe('services', () => {
      describe('LocaleService', () => {
        let service;
        let $locale;

        beforeEach(angular.mock.inject((_localeService_, _$locale_) => {
          service = _localeService_;
          $locale = _$locale_;
        }));

        describe('updateMomentLocale()', () => {
          beforeEach(() => {
            moment.locale('en');
          });

          it('should change moment locale', () => {
            expect(moment.locale()).to.equal('en');
            service.updateMomentLocale('ru');
            expect(moment.locale()).to.equal('ru');
          });

          it('could not change locale to unknown', () => {
            expect(moment.locale()).to.equal('en');
            service.updateMomentLocale('zz');
            expect(moment.locale()).to.equal('en');
          });

          it('should change localed to most appropriate', () => {
            moment.locale('ru');
            expect(moment.locale()).to.equal('ru');
            service.updateMomentLocale('en-ca');
            expect(moment.locale()).to.equal('en');
          });

        });

      });
    });
  });
};
