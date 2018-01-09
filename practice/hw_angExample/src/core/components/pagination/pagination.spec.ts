import {IPagination, Pagination} from './pagination';

// Define shotcut variables here -----------------------------------------------
let pagination: IPagination;
let someOptions = {
  _page: 4,
  _pageSize: 20,
  _totalElements: 100,
  _disabled: false
};

// Define helper functions here ------------------------------------------------
function createEmptyPagination() {
  pagination = new Pagination();
}

function createPagination() {
  pagination = new Pagination(someOptions);
}

// tests here ------------------------------------------------------------------
export default describe('utils', () => {
  describe('Pagination', () => {
    describe('#create()', () => {
      context('when no options specified', () => {
        beforeEach(createEmptyPagination);

        it('sets page size to 10', () => {
          expect(pagination.pageSize).to.equal(10);
        });

        it('sets current page to 0', () => {
          expect(pagination.page).to.equal(0);
        });

        it('sets total elements to 0', () => {
          expect(pagination.totalElements).to.equal(0);
        });

        it('sets total pages to 0', () => {
          expect(pagination.totalPages).to.equal(0);
        });

        it('disables pagination', () => {
          expect(pagination.isDisabled()).to.be.true;
        });
      });

      context('when options specified', () => {
        beforeEach(createPagination);

        it('sets page size', () => {
          expect(pagination.pageSize).to.equal(someOptions._pageSize);
        });

        it('sets current page', () => {
          expect(pagination.page).to.equal(someOptions._page);
        });

        it('sets total elements', () => {
          expect(pagination.totalElements).to.equal(someOptions._totalElements);
        });

        it('sets total pages', () => {
          expect(pagination.totalPages).to.equal(5);
        });

        it('sets disabled state', () => {
          expect(pagination.isDisabled()).to.be.false;
        });
      });
    });

    describe('disabling', () => {
      beforeEach(createPagination);

      context('when enable pagination', () => {
        beforeEach(() => pagination = pagination.enable());

        it('enables pagination', () => {
          expect(pagination.isDisabled()).to.be.false;
        });
      });

      context('when disable pagination', () => {
        beforeEach(() => pagination = pagination.disable());

        it('disables pagination', () => {
          expect(pagination.isDisabled()).to.be.true;
        });
      });
    });

    describe('#setTotalElements', () => {
      beforeEach(createPagination);

      describe('when more than 0', () => {
        beforeEach(() => pagination = pagination.setTotalElements(200));

        it('sets total elements', () => {
          expect(pagination.totalElements).to.equal(200);
        });

        it('calculates total pages', () => {
          expect(pagination.totalPages).to.equal(10);
        });

        it('enables pagination', () => {
          expect(pagination.isDisabled()).to.be.false;
        });
      });

      context('when 0', () => {
        beforeEach(() => pagination = pagination.setTotalElements(0));

        it('disables pagination', () => {
          expect(pagination.isDisabled()).to.be.true;
        });
      });

      context('when less 0', () => {
        beforeEach(() => pagination = pagination.setTotalElements(-100500));

        it('sets total elements to 0', () => {
          expect(pagination.totalElements).to.equal(0);
        });

        it('disables pagination', () => {
          expect(pagination.isDisabled()).to.be.true;
        });
      });

      context('when less than page size', () => {
        beforeEach(() => pagination = pagination.setTotalElements(10));

        it('disables pagination', () => {
          expect(pagination.isDisabled()).to.be.true;
        });

        it('sets page to first', () => {
          expect(pagination.page).to.equal(0);
        });
      });
    });

    describe('#isFirstPage()', () => {
      beforeEach(createPagination);

      context('when first page', () => {
        beforeEach(() => pagination = pagination.setPage(0));

        it('returns true', () => {
          expect(pagination.isFirstPage()).to.be.true;
        });
      });

      context('when last page', () => {
        beforeEach(() => pagination = pagination.setPage(4));

        it('returns false', () => {
          expect(pagination.isFirstPage()).to.be.false;
        });
      });

      context('when some middle page', () => {
        beforeEach(() => pagination = pagination.setPage(2));

        it('returns false', () => {
          expect(pagination.isFirstPage()).to.be.false;
        });
      });
    });

    describe('#isLastPage()', () => {
      beforeEach(createPagination);

      context('when first page', () => {
        beforeEach(() => pagination = pagination.setPage(0));

        it('returns false', () => {
          expect(pagination.isLastPage()).to.be.false;
        });
      });

      context('when last page', () => {
        beforeEach(() => pagination = pagination.setPage(4));

        it('returns true', () => {
          expect(pagination.isLastPage()).to.be.true;
        });
      });

      context('when some middle page', () => {
        beforeEach(() => pagination = pagination.setPage(2));

        it('returns false', () => {
          expect(pagination.isLastPage()).to.be.false;
        });
      });
    });

    describe('#setPage()', () => {
      beforeEach(createPagination);

      context('when less than 0 page', () => {
        beforeEach(() => pagination = pagination.setPage(-100500));

        it('sets to first page', () => {
          expect(pagination.isFirstPage()).to.be.true;
        });
      });

      context('when more than last page', () => {
        beforeEach(() => pagination = pagination.setPage(100500));

        it('sets last page', () => {
          expect(pagination.isLastPage()).to.be.true;
        });
      });

      context('when any suitable page', () => {
        beforeEach(() => pagination = pagination.setPage(3));

        it('sets page', () => {
          expect(pagination.page).to.equal(3);
        });
      });
    });

    describe('#goToNextPage()', () => {
      beforeEach(createPagination);

      context('when last page', () => {
        beforeEach(() => pagination = pagination.setPage(4).goToNextPage());

        it('keeps current page', () => {
          expect(pagination.page).to.equal(4);
        });
      });

      context('when non-last page', () => {
        beforeEach(() => pagination = pagination.setPage(2).goToNextPage());

        it('increases page', () => {
          expect(pagination.page).to.equal(3);
        });
      });
    });

    describe('#goToPrevPage()', () => {
      beforeEach(createPagination);

      context('when first page', () => {
        beforeEach(() => pagination = pagination.setPage(0).goToPrevPage());

        it('keeps current page', () => {
          expect(pagination.page).to.equal(0);
        });
      });

      context('when non-first page', () => {
        beforeEach(() => pagination = pagination.setPage(2).goToPrevPage());

        it('decreases page', () => {
          expect(pagination.page).to.equal(1);
        });
      });
    });

    describe('#goToLastPage()', () => {
      beforeEach(createPagination);

      context('when last page', () => {
        beforeEach(() => pagination = pagination.setPage(4).goToLastPage());

        it('keeps current page', () => {
          expect(pagination.page).to.equal(4);
        });
      });

      context('when non-last page', () => {
        beforeEach(() => pagination = pagination.setPage(2).goToLastPage());

        it('go to last page', () => {
          expect(pagination.page).to.equal(4);
        });
      });
    });

  });
});
