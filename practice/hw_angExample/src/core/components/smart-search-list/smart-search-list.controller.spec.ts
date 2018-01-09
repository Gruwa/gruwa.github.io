import {SmartSearchListController} from './smart-search-list.controller';

export default (ngModule) => {
  describe(ngModule.name, () => {
    describe('smartSearchListController', () => {
      let scope;
      let ctrl;
      let items = [{name: 'one'}, {name: 'two'}, {name: 'three'}];

      beforeEach(() => {
        angular.mock.module(ngModule.name, ($urlRouterProvider) => {
          $urlRouterProvider.deferIntercept();
        });

        angular.mock.inject(($controller, $rootScope) => {
          scope = $rootScope.$new();
          ctrl = $controller(SmartSearchListController, {
            $scope: scope,
            $attrs: {},
            $element: {}
          });
          ctrl.$onInit();
        });
      });

      afterEach(() => {
        scope = null;
        ctrl = null;
      });

      it('creates a controller', () => {
        expect(ctrl).to.be.an('object');
      });

      it('doesn\'t run watcher if there are no items', () => {
        scope.$apply();
        expect(ctrl.viewItems).has.length(0);
      });

      it('creates view list when items appeared', () => {
        scope.$apply();
        expect(ctrl.viewItems).has.length(0);
        ctrl.items = _.clone(items);
        scope.$apply();
        expect(ctrl.viewItems).has.length(3);
      });

      it('checks if item is active', () => {
        ctrl.multiSelect = true;
        ctrl.items = _.clone(items);
        ctrl.selected = [items[1], items[2]];
        expect(ctrl.isItemActive(items[1])).to.be.true;
        expect(ctrl.isItemActive(items[0])).to.be.false;
      });

      describe('select items', () => {
        beforeEach(() => {
          ctrl.items = _.clone(items);
          ctrl.selected = [items[1], items[2]];
        });
        afterEach(() => {
          ctrl.items = [];
          ctrl.selected = [];
        });
        it('creates only one selected item if multiSelect param not set', () => {
          ctrl.saveItemToSelection(items[0]);
          expect(ctrl.selected).to.be.equal(items[0]);
        });
        it('adds item to selected array', () => {
          ctrl.multiSelect = true;
          expect(ctrl.selected).has.length(2);
          ctrl.saveItemToSelection(items[0]);
          expect(ctrl.selected).has.length(3);
        });
        it('removes item from selected array', () => {
          ctrl.multiSelect = true;
          expect(ctrl.selected).has.length(2);
          ctrl.saveItemToSelection(items[1]);
          expect(ctrl.selected).has.length(1);
        });
      });

      describe('search', () => {
        beforeEach(() => {
          ctrl.items = _.clone(items);
          scope.$apply();
        });
        it('resets list if search query less than 3 characters', () => {
          expect(ctrl.viewItems).to.be.eql(items);
          ctrl.searchQuery = 'on';
          ctrl.minLength = 3;
          scope.$apply();
          expect(ctrl.viewItems).to.be.eql(items);
        });
        it('filters list according search query', () => {
          expect(ctrl.viewItems).to.be.eql(items);
          ctrl.searchQuery = 'on';
          ctrl.minLength = 0;
          scope.$apply();
          expect(ctrl.viewItems).to.be.eql([items[0]]);
        });
      });
    });
  });
};
