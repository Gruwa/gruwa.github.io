import {UiGridPagerController} from './ui-grid-pager.component';
import {IPagination, Pagination} from '../pagination/pagination';

const MODULE_NAME = 'cadreon.core.components';

// Define shortcut variables here -----------------------------------------------
let ctrl: UiGridPagerController;
let somePagination: IPagination;
let bindings;
let gridOptions;

// Define mocks here -----------------------------------------------------------
let gridApiMock = {
  pagination: {
    seek: sinon.stub()
  }
};

// Define helper functions here ------------------------------------------------
function createController() {
  angular.mock.inject(($controller: ng.IControllerService) => {
    ctrl = $controller(UiGridPagerController, null, bindings);
    ctrl.gridOptions.onRegisterApi(gridApiMock);
  });
}

function initPagination() {
  somePagination = new Pagination({
    _pageSize: 2,
    _totalElements: gridOptions.data.length
  });
}

function initGridOptions() {
  gridOptions = {data: [1, 2, 3, 4, 5, 6, 7, 8]};
}

function initBindings() {
  bindings = {
    gridOptions: gridOptions,
    pagination: somePagination,
    remote: 'false',
    onPageChanged: sinon.stub()
  };
}

function initEnv() {
  initGridOptions();
  initPagination();
  initBindings();
}
// tests here ------------------------------------------------------------------
export default describe(MODULE_NAME, () => {
  describe('controllers', () => {
    describe('UiGridPagerController', () => {
      beforeEach(initEnv);

      describe('#create()', () => {
        beforeEach(createController);

        it('sets pagination object', () => {
          expect(ctrl.pagination.page).to.equal(somePagination.page);
        });

        it('disables ui-grid pagination controls', () => {
          expect(ctrl.gridOptions.enablePaginationControls).to.be.false;
        });

        it('sets ui-grid\'s minRowsToShow', () => {
          expect(ctrl.gridOptions.minRowsToShow).to.equal(somePagination.pageSize);
        });
      });

      describe('#goToNextPage()', () => {
        beforeEach(createController);
        beforeEach(() => ctrl.goToNextPage());

        it('increases page for pagination object', () => {
          expect(ctrl.pagination.page).to.equal(1);
        });

        it('triggers onPageChanged event in order to notify parent components', () => {
          expect(ctrl.onPageChanged).to.have.been.called;
        });
      });

      describe('#goToPrevPage()', () => {
        beforeEach(createController);
        beforeEach(() => {
          ctrl.goToNextPage();
          ctrl.goToNextPage();
          ctrl.goToNextPage();
          ctrl.goToPrevPage();
        });

        it('decreases page for pagination object', () => {
          expect(ctrl.pagination.page).to.equal(2);
        });

        it('triggers onPageChanged event in order to notify parent components', () => {
          expect(ctrl.onPageChanged).to.have.been.called;
        });
      });
    });
  });
});
