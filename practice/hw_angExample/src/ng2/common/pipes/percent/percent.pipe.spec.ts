import {cadNoDataSymbol} from '../../../cadreon.const';
import {CadPercentPipe} from './percent.pipe';

describe('UnityCommonModule', () => {
  describe('cadPercent pipe', () => {
    let pipe: CadPercentPipe;

    let mocks = {
      decimalPipe: <any> {
        transform: sinon.stub()
      }
    };

    beforeEach(() => {
      pipe = new CadPercentPipe(mocks.decimalPipe);
    });

    it('should output - in case input not number', () => {
      expect(pipe.transform(<any>  'adsf')).to.equal(cadNoDataSymbol);
    });

    it('should output - in case input not number2', () => {
      expect(pipe.transform(undefined)).to.equal(cadNoDataSymbol);
    });

    it('should use filter', () => {
      mocks.decimalPipe.transform.withArgs(123, '1.2-2').returns('123.00');
      expect(pipe.transform(123)).to.equal('123.00%');
    });

  });
});
