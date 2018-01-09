import {StorageService} from './storage.service';

describe('StorageService', () => {
  let $window;
  let storageService: StorageService;

  beforeEach(() => {
    $window = {
      localStorage: {
        getItem: sinon.stub(),
        setItem: sinon.stub(),
        removeItem: sinon.stub()
      },
      sessionStorage: {
        getItem: sinon.stub(),
        setItem: sinon.stub(),
        removeItem: sinon.stub()
      }
    };
    storageService = new StorageService($window);
  });

  it('should exist', () => {
    expect(storageService).to.exist;
  });

  describe('read()', () => {
    it('should read from local storage by default', () => {
      $window.localStorage.getItem.returns('bbb');
      expect(storageService.read('aaa')).to.equal('bbb');
    });

    it('should read from session storage if asked', () => {
      $window.sessionStorage.getItem.returns('bbb');
      expect(storageService.read('aaa', {type: 'session'})).to.equal('bbb');
    });

    it('should parse json and decode base64 value', () => {
      $window.localStorage.getItem.returns('bbb');
      const stub = sinon.stub(storageService, 'decode');
      storageService.read('aaa', {useBase64: true, fallbackVal: 'yyy'});
      expect(stub).calledWith('bbb', 'yyy');
    });
  });

  describe('write()', () => {
    it('should write to local storage by default', () => {
      storageService.write('aaa', 'bbb');
      expect($window.localStorage.setItem).calledWith('aaa', 'bbb');
      expect($window.sessionStorage.setItem).not.calledWith('aaa', 'bbb');
    });

    it('should write to session storage if asked', () => {
      storageService.write('aaa', 'bbb', {type: 'session'});
      expect($window.localStorage.setItem).not.calledWith('aaa', 'bbb');
      expect($window.sessionStorage.setItem).calledWith('aaa', 'bbb');
    });

    it('should serialize and encode to base64', () => {
      const stub = sinon.stub(storageService, 'encode');
      storageService.write('aaa', 'val', {useBase64: true});
      expect(stub).calledWith('val');
    });
  });

  describe('remove()', () => {
    it('should remove item from local storage by default', () => {
      storageService.remove('aaa');
      expect($window.localStorage.removeItem).calledWith('aaa');
      expect($window.sessionStorage.removeItem).not.calledWith('aaa');
    });

    it('should remove item from session storage is asked', () => {
      storageService.remove('aaa', {type: 'session'});
      expect($window.localStorage.removeItem).not.calledWith('aaa');
      expect($window.sessionStorage.removeItem).calledWith('aaa');
    });
  });

  describe('encode()', () => {
    it('should serialize to json, encode with base64 and save result to storage', () => {
      const obj = {foo: 'bar'};
      const objEncoded = 'eyJmb28iOiJiYXIifQ==';
      storageService.write('aaa', obj, {useBase64: true});
      expect($window.localStorage.setItem).calledWith('aaa', objEncoded);
    });
  });

  describe('decode()', () => {
    it('should decode base64, parse json and return result', () => {
      $window.localStorage.getItem.returns('eyJmb28iOiJiYXIifQ==');
      expect(storageService.read('aaa', {useBase64: true})).to.deep.equal({foo: 'bar'});
    });

    it('should return fallback value if parsing/decoding failed', () => {
      $window.localStorage.getItem.returns('bad-data');
      expect(storageService.read('aaa', {useBase64: true, fallbackVal: 'zzz'})).to.equal('zzz');
    });

    it('should return fallback value if nothing to decode', () => {
      $window.localStorage.getItem.returns('');
      expect(storageService.read('aaa', {useBase64: true, fallbackVal: 'zzz'})).to.equal('zzz');
    });
  });
});
