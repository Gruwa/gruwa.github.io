import {ItemLabelPipe} from './item-label.pipe';

describe('itemLabel pipe', () => {
  let filter: ItemLabelPipe;

  beforeEach(() => {
    filter = new ItemLabelPipe();
  });

  it('should return empty string when no input', () => {
    expect(filter.transform()).to.equal('');

  });

  describe('without label', () => {
    it('should return default "title" prop value', () => {
      expect(filter.transform({title: 'zzz'})).to.equal('zzz');
    });

    it('should return default "displayName" prop value', () => {
      expect(filter.transform({displayName: 'zzz'})).to.equal('zzz');
    });

    it('should return default "name" prop value', () => {
      expect(filter.transform({name: 'zzz'})).to.equal('zzz');
    });

    it('should return default "id" prop value', () => {
      expect(filter.transform({id: 'zzz'})).to.equal('zzz');
    });

    it('should return json version of input if no default label found', () => {
      expect(filter.transform({foo: 'zzz'})).to.equal('{"foo":"zzz"}');
    });

    it('should return original input if it is a string', () => {
      expect(filter.transform('foo-bar')).to.equal('foo-bar');
    });
  });

  describe('with label', () => {
    it('should return label field value', () => {
      expect(filter.transform({campaign: 'zzz'}, 'campaign')).to.equal('zzz');
    });

    it('should parse label field template', () => {
      expect(filter.transform({campaign: 'zzz'}, '<%- data.campaign %>')).to.equal('zzz');
    });

    it('should support nested label', () => {
      expect(filter.transform({item: {prop: 'zzz'}}, 'item.prop')).to.be.equal('zzz');
    });

    it('should return json version of input if no value found by label', () => {
      expect(filter.transform({foo: 'zzz'}, 'qqq')).to.equal('{"foo":"zzz"}');
    });
  });
});
