import * as moment from 'moment';
import {AuditTrailController} from './audit-trail.component';

const MODULE_NAME = 'cadreon.core.auditTrail';

// Define shortcut variables here -----------------------------------------------
let ctrl: AuditTrailController;
let $q;
let $rootScope;
let cadAuditTrailService;
let logSample = [
  {
    fieldName: 'actualEndDate',
    oldValue: null,
    newValue: '2015-11-07',
    label: 'Actual End Date',
    type: 'date'
  }
];

let entity = {
  id: 'abc',
  currencyIsoCode: 'USD'
};

let bindings = {
  entity: entity,
  entityName: 'campaign',
  entityTitle: 'Campaign',
  entityType: 'csf',
  text: 'Campaign Change Log'
};

// Define mocks here -----------------------------------------------------------
class AuditTrailServiceMock {
  getChangeLog = sinon.stub().returns($q.resolve(logSample));
  detailsPageSize = 10;
}

// Define helper functions here ------------------------------------------------
function runDigest() {
  $rootScope.$digest();
}

function createController() {
  angular.mock.inject(($controller: ng.IControllerService, _$rootScope_) => {
    // store reference to service to global shortcut var
    cadAuditTrailService = new AuditTrailServiceMock();
    let $scope = _$rootScope_.$new();
    ctrl = $controller(
      AuditTrailController,
      { cadAuditTrailService, $scope, dateRangeConfigService: {get: sinon.stub().returns([])} },
      _.cloneDeep(bindings)
    );
  });
}

function injectServices() {
  angular.mock.inject((_$q_, _$rootScope_) => {
    $q = _$q_;
    $rootScope = _$rootScope_;
  });
}

// Test Suit here --------------------------------------------------------------
export default describe(MODULE_NAME, () => {
  beforeEach(angular.mock.module(MODULE_NAME));
  beforeEach(injectServices);
  beforeEach(createController);

  describe('controllers', () => {
    describe('AuditTrailController', () => {
      describe('#create()', () => {
        it('sets details page size', () => {
          expect(ctrl.detailsPageSize).to.eql(cadAuditTrailService.detailsPageSize);
        });

        describe('init date picker', () => {
          it('sets start date to past week', () => {
            let pastWeekDate = moment().subtract(6, 'days');

            expect(ctrl.logDates.startDate.isSame(pastWeekDate, 'day')).to.be.true;
          });

          it('sets end date to current day', () => {
            let today = moment();

            expect(ctrl.logDates.endDate.isSame(today, 'day')).to.be.true;
          });
        });

        function itFetchesData() {
          it('fetches new data', () => {
            expect(cadAuditTrailService.getChangeLog).to.have.been.calledOnce;
          });
        }

        context('when date range changed', () => {
          beforeEach(() => { ctrl.logDates.startDate = moment('2016-01-01'); });
          beforeEach(runDigest);

          itFetchesData();
        });

        context('when entity changed', () => {
          beforeEach(() => { ctrl.entity.id = 'qwe'; });
          beforeEach(runDigest);

          itFetchesData();
        });
      });

      describe('#fetchData()', () => {
        function itDoesntFetchData() {
          it('doesn\'t fetch data', () => {
            expect(cadAuditTrailService.getChangeLog).to.have.not.been.called;
          });
        }

        context('when start date is empty', () => {
          beforeEach(() => { ctrl.logDates.startDate = null; });
          beforeEach(() => { ctrl.fetchData(); });

          itDoesntFetchData();
        });

        context('when end date is empty', () => {
          beforeEach(() => { ctrl.logDates.endDate = null; });
          beforeEach(() => { ctrl.fetchData(); });

          itDoesntFetchData();
        });

        context('when data received', () => {
          context('when ok', () => {
            beforeEach(() => { ctrl.fetchData(); });
            beforeEach(runDigest);

            it('stores logs array', () => {
              expect(ctrl.logs).to.eql(logSample);
            });

            it('sets status to done', () => {
              expect(ctrl.status).to.equal('done');
            });
          });

          context('when response is empty', () => {
            beforeEach(() => { cadAuditTrailService.getChangeLog.returns($q.resolve([])); });
            beforeEach(() => { ctrl.fetchData(); });
            beforeEach(runDigest);

            it('has empty logs list', () => {
              expect(ctrl.logs).to.be.empty;
            });

            it('sets status to empty', () => {
              expect(ctrl.status).to.equal('empty');
            });
          });

          context('when error', () => {
            beforeEach(() => { cadAuditTrailService.getChangeLog.returns($q.reject()); });
            beforeEach(() => { ctrl.fetchData(); });
            beforeEach(runDigest);

            it('sets status to error', () => {
              expect(ctrl.status).to.equal('error');
            });
          });
        });
      });
    });
  });
});
