import {cadNoDataSymbol} from '../../../cadreon.const';
import {CadNumberPipe} from './number.pipe';

describe('UnityNumberModule', () => {
  describe('cadNumber pipe', () => {
    let pipe;

    let mocks = {
      decimalPipe: <any> {
        transform: sinon.stub()
      }
    };

    beforeEach(() => {
      pipe = new CadNumberPipe(mocks.decimalPipe);
    });

    afterEach(() => {
      mocks.decimalPipe.transform.reset();
    });

    it('should be defined', () => {
      expect(pipe).to.exist;
    });

    it('should return dash if input is not number', () => {
      expect(pipe.transform(undefined, 2)).to.equal(cadNoDataSymbol);
      expect(pipe.transform('test', 2)).to.equal(cadNoDataSymbol);
    });

    it('should call decimal pipe', () => {
      pipe.transform(3, '1.2-3');
      expect(mocks.decimalPipe.transform).calledOnce.and.calledWith(3, '1.2-3');
    });
  });
});
