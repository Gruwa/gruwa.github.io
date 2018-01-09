export default (ngModule) => {
  describe(ngModule.name, () => {
    let $rootScope;
    let mocks = {
      $location: {
        search: sinon.spy(() => {
          return {
            q: 'new test'
          };
        }),
        url: sinon.spy()
      }
    };

    beforeEach(angular.mock.module(ngModule.name, ($provide) => {
      $provide.value('$location', mocks.$location);
    }));

    describe('services', () => {
      describe('urlParamsBrokerService', () => {
        let urlParamsBrokerService;

        beforeEach(angular.mock.inject((_urlParamsBrokerService_, _$rootScope_) => {
          urlParamsBrokerService = _urlParamsBrokerService_;
          $rootScope = _$rootScope_;
        }));

        afterEach(() => {
          mocks.$location.search.reset();
        });

        describe('setParam()/getParam()', () => {
          it('should set undefined to param if param is array and empty', () => {
            urlParamsBrokerService.setParam('q', []);
            expect(urlParamsBrokerService.getParam('q')).to.be.a('undefined');
          });

          it('should set undefined to param if param is object and empty', () => {
            urlParamsBrokerService.setParam('q', {});
            expect(urlParamsBrokerService.getParam('q')).to.be.a('undefined');
          });

          it('should set string to param if string is not empty', () => {
            urlParamsBrokerService.setParam('q', 'not empty string');
            expect(urlParamsBrokerService.getParam('q')).to.equal('not empty string');
          });

          it('should set undefined to param if param is string and empty', () => {
            urlParamsBrokerService.setParam('q', '');
            expect(urlParamsBrokerService.getParam('q')).to.be.a('undefined');
          });

          it('should set number to param even if number is 0', () => {
            urlParamsBrokerService.setParam('q', 0);
            expect(urlParamsBrokerService.getParam('q')).to.equal(0);
          });

          it('should set undefined to param if param is null', () => {
            urlParamsBrokerService.setParam('q', null);
            expect(urlParamsBrokerService.getParam('q')).to.be.a('undefined');
          });

          it('should broadcast event when param is changed', () => {
            urlParamsBrokerService.setParam('q', 'test');
            let spy = sinon.spy($rootScope, '$broadcast');
            urlParamsBrokerService.setParam('q', 'new test');
            expect(spy).calledOnce;
            expect(spy).calledWith('urlParamChanged:q', 'new test');
          });

          it('should broadcast event when param is not changed', () => {
            urlParamsBrokerService.setParam('q', 'test');
            let spy = sinon.spy($rootScope, '$broadcast');
            urlParamsBrokerService.setParam('q', 'test');
            expect(spy).not.called;
          });

          it('should broadcast event when is called with silent mode', () => {
            urlParamsBrokerService.setParam('q', 'test');
            let spy = sinon.spy($rootScope, '$broadcast');
            urlParamsBrokerService.setParam('q', 'new test', true);
            expect(spy).not.called;
          });

          it('it should encode param for setting in URL', () => {
            urlParamsBrokerService.setParam('q', {a: 123});
            expect(mocks.$location.search).calledWith('q', '{"a":123}');
          });
        });

        describe('startWatchingUrl()', () => {
          it('init params from state', () => {
            urlParamsBrokerService.startWatchingUrl();

            $rootScope.$broadcast('$stateChangeStart', {}, {
              q: 'test'
            });
            expect(urlParamsBrokerService.getParam('q')).to.equal('test');
          });

          it('should broadcast reseting event', () => {
            urlParamsBrokerService.setParam('q', 'test');
            urlParamsBrokerService.startWatchingUrl();

            let spy = sinon.spy($rootScope, '$broadcast');

            $rootScope.$broadcast('$stateChangeStart', {}, {
              q: null
            });

            expect(spy).calledTwice;
            expect(spy).calledWith('urlParamReseted:q');
          });

          it('should update params if url was changed', () => {
            urlParamsBrokerService.setParam('q', 'test');
            urlParamsBrokerService.startWatchingUrl();

            let spy = sinon.spy($rootScope, '$broadcast');

            $rootScope.$broadcast('$locationChangeSuccess');

            expect(urlParamsBrokerService.getParam('q')).to.equal('new test');
            expect(spy).calledTwice;
            expect(spy).calledWith('urlParamChanged:q', 'new test');
          });
        });

        describe('decodeURLParam()', () => {
          it('should return undefined if input value is Null', () => {
            expect(urlParamsBrokerService.decodeURLParam(null)).to.undefined;
          });

          it('should return undefined if input value is Undefined', () => {
            expect(urlParamsBrokerService.decodeURLParam(undefined)).to.undefined;
          });

          it('should return object if input value previously encoded object', () => {
            expect(urlParamsBrokerService.decodeURLParam('{"foo": "bar"}')).to.deep.equal({foo: 'bar'});
          });

          it('should return string if null was previously encoded', () => {
            expect(urlParamsBrokerService.decodeURLParam('null')).to.equal('null');
          });

          it('should return string if number was previously encoded', () => {
            expect(urlParamsBrokerService.decodeURLParam('5')).to.equal('5');
          });

          it('should return previously encoded big number', () => {
            expect(urlParamsBrokerService.decodeURLParam('123456789012345678901234567890'))
              .to.equal('123456789012345678901234567890');
          });

          it('should return string if boolean was previously encoded', () => {
            expect(urlParamsBrokerService.decodeURLParam('true')).to.equal('true');
          });

          it('should return string if string was previously encoded', () => {
            expect(urlParamsBrokerService.decodeURLParam('string')).to.equal('string');
          });

          it('should return value if incorrect value', () => {
            expect(urlParamsBrokerService.decodeURLParam('"true')).to.equal('"true');
          });
        });

        describe('encodeURLParam()', () => {
          it('should encode if array', () => {
            expect(urlParamsBrokerService.encodeURLParam([1, 2, 3])).to.equal('[1,2,3]');
          });
          it('should encode if object', () => {
            expect(urlParamsBrokerService.encodeURLParam({foo: 'bar'})).to.equal('{"foo":"bar"}');
          });
          it('should not encode if string', () => {
            expect(urlParamsBrokerService.encodeURLParam('123')).to.equal('123');
          });
          it('should not encode if number', () => {
            expect(urlParamsBrokerService.encodeURLParam(123)).to.equal(123);
          });
          it('should not encode if boolean', () => {
            expect(urlParamsBrokerService.encodeURLParam(true)).to.equal(true);
          });
          it('should not encode if null', () => {
            expect(urlParamsBrokerService.encodeURLParam(null)).to.equal(null);
          });
        });
      });
    });
  });
};
