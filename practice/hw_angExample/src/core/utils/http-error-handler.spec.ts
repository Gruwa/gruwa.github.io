import {HttpErrorHandler} from './http-error-handler';
import coreModule from '../core.module';

describe('utils', () => {
  let stateProvider;
  let state;
  let handler;
  let scope;

  beforeEach(angular.mock.module(coreModule.name, ($provide, $urlRouterProvider, $stateProvider) => {
    $urlRouterProvider.deferIntercept();
    stateProvider = $stateProvider;
  }));

  describe('HttpErrorHandler', () => {
    beforeEach(angular.mock.inject((_$state_, _$q_, $rootScope) => {
      state = _$state_;
      handler = new HttpErrorHandler(_$state_, _$q_);
      scope = $rootScope.$new(true);

      stateProvider.state('500', {});
      stateProvider.state('404', {});
      stateProvider.state('403', {});
    }));

    describe('handle()', () => {
      it('should go to 500 state', () => {
        handler.handle()({status: 500});
        scope.$apply();
        expect(state.current.name).to.eql('500');
      });

      it('should go to 404 state', () => {
        handler.handle()({status: 404});
        scope.$apply();
        expect(state.current.name).to.eql('404');
      });

      it('should go to 403 state', () => {
        handler.handle()({status: 403});
        scope.$apply();
        expect(state.current.name).to.eql('403');
      });

      it('should reject other errors', () => {
        state.current.name = 'campaigns';
        handler.handle()({status: 400});
        scope.$apply();
        expect(state.current.name).to.eql('campaigns');
      });
    });

  });

});
