import {rot13} from './rot13';

describe('RotService', () => {
  const decoded = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const encoded = 'NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm';

  describe('rot13()', () => {
    it('should decode raw string correctly', () => {
      expect(rot13(encoded)).to.equal(decoded);
    });

    it('should process empty input', () => {
      expect(rot13('')).to.equal('');
    });
  });
});
