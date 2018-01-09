import {TrackChangesService} from './track-changes.service';

describe('TrackChangesService', () => {
  let modalService;
  let service: TrackChangesService;

  beforeEach(() => {
    modalService = {open: sinon.stub().returns({result: ''})};
    service = new TrackChangesService(modalService);
  });

  describe('equal()', () => {
    it('should return true for equal objects', () => {
      const a = [{a: {foo: 'bar'}}, {b: 111}];
      const b = [{a: {foo: 'bar'}}, {b: 111}];
      expect(service.equal(a, b, true)).to.be.true;
    });

    it('should return false for non equal objects', () => {
      const a = [{a: {foo: 'bar'}}, {b: 111}];
      const b = {a: 'zzz'};
      expect(service.equal(a, b, true)).to.be.false;
    });

    it('should skip angular internal props starting from $', () => {
      const a = { foo: 'bar', $ng: 111 };
      const b = { foo: 'bar', $ng: 999 };
      expect(service.equal(a, b, true)).to.be.true;
    });

    it('should ignore empty props', () => {
      const a = { foo: 'bar', empty: null };
      const b = { foo: 'bar', empty: '' };
      expect(service.equal(a, b, true)).to.be.true;
    });

    it('should not ignore empty props when needed', () => {
      const a = { foo: 'bar', empty: null };
      const b = { foo: 'bar', empty: '' };
      expect(service.equal(a, b, false)).to.be.false;
    });
  });

  describe('showPopup()', () => {
    it('should call method from other service', () => {
      service.showPopup();
      expect(modalService.open).calledOnce;
    });
  });

});
