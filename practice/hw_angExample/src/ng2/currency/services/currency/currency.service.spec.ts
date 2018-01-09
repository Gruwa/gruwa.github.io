import {CurrencyService} from './currency.service';
import {LoggerServiceMock} from '../../../common/services/logger/logger.service.mock';

describe('UnityCurrencyModule ->', () => {
  describe('CurrencyService ->', () => {
    let service;

    let mocks = {
      loggerService: LoggerServiceMock
    };

    beforeEach(() => {
      service = new CurrencyService(mocks.loggerService);
    });

    describe('getCurrencyByCode() ->', () => {
      it('should log error and do not return nothing if currency code is not exist', () => {
        expect(service.getCurrencyByCode('AAA')).to.be.an('undefined');
        expect(mocks.loggerService.error).calledOnce;
      });

      it('should return currency object', () => {
        expect(service.getCurrencyByCode('USD')).to.deep.equal({
          name: 'United States Dollar',
          code: 'USD',
          sign: '\u0024'
        });
      });
    });
  });
});
