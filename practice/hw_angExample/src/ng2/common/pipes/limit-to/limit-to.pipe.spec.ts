import {CadLimitToPipe} from './limit-to.pipe';

describe('cadLimitTo pipe', () => {
  let filter: CadLimitToPipe;

  beforeEach(() => {
    filter = new CadLimitToPipe();
  });

  it('should return input if no limit passed', () => {
    expect(filter.transform('str')).to.equal('str');
  });

  it('should truncate input string', () => {
    expect(filter.transform('abracadabra', 3)).to.equal('abr...');
  });

  it('should return input string if no need to truncate it', () => {
    expect(filter.transform('abracadabra', 99)).to.equal('abracadabra');
  });
});
