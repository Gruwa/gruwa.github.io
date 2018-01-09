import {cadNoDataSymbol} from '../../cadreon.const';
import {AuditTrailService, IAuditTrailSourceParams} from './audit-trail.service';

const MODULE_NAME = 'cadreon.core.auditTrail';

describe(MODULE_NAME, () => {
  beforeEach(angular.mock.module(MODULE_NAME, ($urlRouterProvider) => {
    $urlRouterProvider.deferIntercept();
  }));

  describe('services', () => {
    describe('cadAuditTrailService', () => {
      let service;
      let $q: ng.IQService;
      let $rootScope: ng.IRootScopeService;

      let cadDateTZFilterStub = sinon.stub();
      let cadCurrencyFilterStub = sinon.stub();
      let numberFilterStub = sinon.stub();
      let cadNumberFilterStub = sinon.stub();
      let translateFilterStub = sinon.stub();
      let cadPercentFilterStub = sinon.stub();
      let filterStub = sinon.stub();
      filterStub.withArgs('cadDateTZ').returns(cadDateTZFilterStub);
      filterStub.withArgs('cadCurrency').returns(cadCurrencyFilterStub);
      filterStub.withArgs('number').returns(numberFilterStub);
      filterStub.withArgs('cadNumber').returns(cadNumberFilterStub);
      filterStub.withArgs('translate').returns(translateFilterStub);
      filterStub.withArgs('cadPercent').returns(cadPercentFilterStub);

      let mocks = {
        $filter: filterStub,
        $http: <any> {
          get: sinon.stub()
        },
        $translate: <any> {
          instant: sinon.stub().returns('USD')
        }
      };

      let logs = {
        changeLog: [
          {
            changedFields: [
              {
                oldValue: '2015-05-18T04:00:00',
                newValue: null,
                type: 'date'
              },
              {
                oldValue: '2015-12-02T00:21:05',
                newValue: null,
                type: 'datetime'
              },
              {
                oldValue: 67500,
                newValue: null,
                type: 'currency'
              },
              {
                oldValue: 67500,
                newValue: null,
                type: 't_long'
              },
              {
                oldValue: 'foo',
                newValue: null,
                type: 'text'
              },
              {
                oldValue: 13.2,
                newValue: null,
                type: 'percent'
              },
              {
                oldValue: [1, 2, 3],
                newValue: null,
                type: 'list'
              },
              {
                oldValue: true,
                newValue: null,
                type: 't_boolean'
              },
              {
                oldValue: 123,
                newValue: null,
                type: 't_decimal'
              },
              {
                oldValue: 42,
                newValue: null,
                type: 't_int'
              },
              {
                oldValue: [{a: 'b'}, {a: 'c'}],
                newValue: null,
                type: 'list'
              }
            ]
          }
        ]
      };

      beforeEach(angular.mock.inject((_$rootScope_, _$q_) => {
        $rootScope = _$rootScope_;
        $q = _$q_;
        service = new AuditTrailService(mocks.$filter, mocks.$http);
      }));

      describe('getChangeLog()', () => {
        let urlParams: IAuditTrailSourceParams = {
          entityName: 'foobar',
          entityId: '42',
          entityType: 'barfoo'
        };

        let deferred;

        let requestParams = {};

        beforeEach(() => {
          deferred = $q.defer();
          mocks.$http.get.returns(deferred.promise);
          service.getChangeLog(urlParams, requestParams, 'USD');
        });

        it('should fetch log data', () => {
          expect(mocks.$http.get).calledWith('changelog/foobar/42', {
            params: requestParams,
            prefix: urlParams.entityType
          });
        });

        context('resolve fetching data', () => {
          let stub: sinon.SinonStub;

          beforeEach(() => {
            stub = sinon.stub(service, 'formatLogData');
            deferred.resolve({
              data: logs
            });
            $rootScope.$digest();
          });

          afterEach(() => {
            stub.restore();
          });

          it('should call formatting of input data', () => {
            expect(stub).calledWith(logs.changeLog, 'USD');
          });
        });
      });

      describe('formatLogData()', () => {
        let formattedLogs;

        beforeEach(() => {
          cadDateTZFilterStub.withArgs(
            logs.changeLog[0].changedFields[0].oldValue,
            'mediumDate'
          ).returns('formattedDate');
          cadDateTZFilterStub.withArgs(
            logs.changeLog[0].changedFields[1].oldValue,
            'mediumDateShortTime'
          ).returns('formattedDateTime');
          cadCurrencyFilterStub.withArgs(
            logs.changeLog[0].changedFields[2].oldValue
          ).returns('formattedCurrency');
          cadCurrencyFilterStub.returns(cadNoDataSymbol);
          cadNumberFilterStub.withArgs(
            logs.changeLog[0].changedFields[3].oldValue
          ).returns('formattedNumber');
          cadNumberFilterStub.returns(cadNoDataSymbol);
          cadPercentFilterStub.withArgs(
            logs.changeLog[0].changedFields[5].oldValue
          ).returns('formattedPercent');
          cadPercentFilterStub.returns(cadNoDataSymbol);
          translateFilterStub.withArgs(
            'audit_trail.formatter.t_boolean.true'
          ).returns('formattedBoolean');
          numberFilterStub.withArgs(
            logs.changeLog[0].changedFields[8].oldValue
          ).returns('formattedDecimal');
          numberFilterStub.withArgs(
            logs.changeLog[0].changedFields[9].oldValue
          ).returns('formattedInt');

          formattedLogs = service.formatLogData(angular.copy(logs.changeLog), 'USD')[0].changedFields;
        });

        it('formats dates', () => {
          expect(formattedLogs[0]).to.eql({
            oldValue: 'formattedDate',
            newValue: cadNoDataSymbol,
            type: 'date'
          });
        });

        it('formats date and time', () => {
          expect(formattedLogs[1]).to.eql({
            oldValue: 'formattedDateTime',
            newValue: cadNoDataSymbol,
            type: 'datetime'
          });
        });

        it('formats currency', () => {
          expect(formattedLogs[2]).to.eql({
            oldValue: 'formattedCurrency',
            newValue: cadNoDataSymbol,
            type: 'currency'
          });
        });

        it('formats long', () => {
          expect(formattedLogs[3]).to.eql({
            oldValue: 'formattedNumber',
            newValue: cadNoDataSymbol,
            type: 't_long'
          });
        });

        it('formats text', () => {
          expect(formattedLogs[4]).to.eql({
            oldValue: 'foo',
            newValue: cadNoDataSymbol,
            type: 'text'
          });
        });

        it('formats percent', () => {
          expect(formattedLogs[5]).to.eql({
            oldValue: 'formattedPercent',
            newValue: cadNoDataSymbol,
            type: 'percent'
          });
        });

        it('formats list', () => {
          expect(formattedLogs[6]).to.eql({
            oldValue: '1, 2, 3',
            newValue: cadNoDataSymbol,
            type: 'list'
          });
        });

        it('should NOT format list with non-primitive values', () => {
          expect(formattedLogs[10]).to.eql({
            oldValue: [{a: 'b'}, {a: 'c'}],
            newValue: cadNoDataSymbol,
            type: 'list'
          });
        });

        it('formats boolean', () => {
          expect(formattedLogs[7]).to.eql({
            oldValue: 'formattedBoolean',
            newValue: cadNoDataSymbol,
            type: 't_boolean'
          });
        });

        it('formats long', () => {
          expect(formattedLogs[8]).to.eql({
            oldValue: 'formattedDecimal',
            newValue: '—',
            type: 't_decimal'
          });
        });

        it('formats int', () => {
          expect(formattedLogs[9]).to.eql({
            oldValue: 'formattedInt',
            newValue: '—',
            type: 't_int'
          });
        });

      });

    });
  });
});
