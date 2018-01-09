import {HighlightPipe} from './highlight.pipe';

describe('highlight pipe', () => {
  let filter: HighlightPipe;

  beforeEach(() => {
    filter = new HighlightPipe();
  });

  it('should return input if nothing to highlight', () => {
    expect(filter.transform('zzz')).to.equal('zzz');
  });

  it('should wrap highlight into <span>', () => {
    const text = 'Lorem ipsum dolor sit amet';
    const search = 'dolor';
    const hlClass = 'xxx';
    const textHl = `Lorem ipsum <span class="${hlClass}">dolor</span> sit amet`;
    expect(filter.transform(text, search, hlClass)).to.equal(textHl);
  });
});
