import {cadNoDataSymbol} from '../../../cadreon.const';
import {CadNumberShortPipe} from './number-short.pipe';

describe('UnityNumberModule', () => {
  describe('cadNumberShort pipe', () => {
    let pipe;

    let mocks = {
      decimalPipe: <any> {
        transform: sinon.stub()
      }
    };

    beforeEach(() => {
      pipe = new CadNumberShortPipe(mocks.decimalPipe);
    });

    afterEach(() => {
      mocks.decimalPipe.transform.reset();
    });

    it('should be defined', () => {
      expect(pipe).to.exist;
    });

    it('should return dash symbol', () => {
      expect(pipe.transform('bestic')).to.equal(cadNoDataSymbol);
    });

    it('should not be suffixed', () => {
      mocks.decimalPipe.transform.withArgs(1).returns('1');
      mocks.decimalPipe.transform.withArgs(10).returns('10');
      mocks.decimalPipe.transform.withArgs(999).returns('999');

      expect(pipe.transform(1)).to.be.equal('1');
      expect(pipe.transform(10)).to.be.equal('10');
      expect(pipe.transform(999)).to.be.equal('999');
    });

    it('should use formatting for small numbers', () => {
      mocks.decimalPipe.transform.withArgs(1.5, '1.2-2').returns('1.50');
      expect(pipe.transform(1.5, '1.2-2', '1.0-0')).to.be.equal('1.50');
    });

    it('numbers less than a million should be suffixed with K', () => {
      mocks.decimalPipe.transform.withArgs(1.6, '1.0-0').returns('1');
      mocks.decimalPipe.transform.withArgs(1.7, '1.0-0').returns('2');
      mocks.decimalPipe.transform.withArgs(1.8, '1.2-2').returns('1.80');
      expect(pipe.transform(1600, '1.2-2', '1.0-0')).to.be.equal('1K');
      expect(pipe.transform(1700, '1.2-2', '1.0-0')).to.be.equal('2K');
      expect(pipe.transform(1800, '1.2-2', '1.2-2')).to.be.equal('1.80K');
    });
    //
    it('numbers less than a billion should be suffixed with M', () => {
      mocks.decimalPipe.transform.withArgs(1, '1.0-0').returns('1');
      expect(pipe.transform(1000000)).to.be.equal('1M');
    });

    it('numbers less than a trillion should be suffixed with B', () => {
      mocks.decimalPipe.transform.withArgs(1, '1.0-0').returns('1');
      expect(pipe.transform(1000000000)).to.be.equal('1B');
    });

  });
});
