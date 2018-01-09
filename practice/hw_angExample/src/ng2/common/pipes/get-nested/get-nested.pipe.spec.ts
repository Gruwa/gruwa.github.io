import {GetNestedPipe} from './get-nested.pipe';

describe('getNested pipe', () => {
  let filter: GetNestedPipe;

  beforeEach(() => {
    filter = new GetNestedPipe();
  });

  it('should return object prop value by string path', () => {
    const obj = {foo: {bar: 'zzz'}};
    expect(filter.transform(obj, 'foo.bar')).to.equal('zzz');
  });

  it('should return json version of object when no string path ', () => {
    const obj = {bar: 'zzz'};
    expect(filter.transform(obj)).to.equal('{"bar":"zzz"}');
  });
});
