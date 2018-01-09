"use strict";

export default (ngModule) => {
  describe(ngModule.name, () => {
    beforeEach(angular.mock.module(ngModule.name));

      describe('directives', () => {
        let $compile, $rootScope;

        beforeEach(inject((_$compile_, _$rootScope_) => {
          $compile = _$compile_;
          $rootScope = _$rootScope_;
        }));

        describe('cadDateTimePicker', () => {
        });
      });
  });
};
