import {TestScheduler} from 'rxjs/testing/TestScheduler';
import {SearchGlobalComponent} from './search-global.component';

const getMocks = () => ({
  $rootScope: {
    $on: sinon.stub()
  },
  $state: {
    current: {}
  },
  urlParamsBrokerService: {
    getParam: sinon.stub(),
    setParam: sinon.stub(),
    urlParamChanges: sinon.stub()
  }
});

describe('header ->', () => {
  describe('components ->', () => {
    describe('search global component ->', () => {
      let mocks;
      let component;

      let scheduler;
      let setQueryValue;

      beforeEach(() => {
        mocks = getMocks();

        scheduler = new TestScheduler(null);
        mocks.urlParamsBrokerService.urlParamChanges.returns(scheduler.createColdObservable('-a-b|', {
          a: { param: 'other', value: 'abc' },
          b: { param: 'q', value: 'xyz' }
        }));

        component = new SearchGlobalComponent(
          <any> mocks.$rootScope,
          <any> mocks.$state,
          <any> mocks.urlParamsBrokerService
        );

        setQueryValue = sinon.spy(component.searchQueryControl, 'setValue');
      });

      it('should take current search param', () => {
        mocks.urlParamsBrokerService.getParam.returns('aabbcc');
        component.ngOnInit();

        expect(setQueryValue).to.be.calledOnce.and.calledWith('aabbcc');
      });

      it('should be open if there is current search', () => {
        mocks.urlParamsBrokerService.getParam.returns('aabbcc');
        component.ngOnInit();

        expect(component.collapsed).to.be.false;
      });

      it('should be close if there is no current search', () => {
        mocks.urlParamsBrokerService.getParam.returns(null);
        component.ngOnInit();

        expect(component.collapsed).to.be.true;
      });

      it('should be enable for current state', () => {
        mocks.$state.current.data = { searchEnabled: true };
        component.ngOnInit();

        expect(component.enabled).to.be.true;
      });

      it('should be disabled for current state', () => {
        mocks.$state.current.data = { searchEnabled: false };
        component.ngOnInit();

        expect(component.enabled).to.be.false;
      });

      it('should subscribe to url param changes', () => {
        component.ngOnInit();

        setQueryValue.reset();
        scheduler.flush();

        expect(setQueryValue).to.be.calledOnce.and.calledWith('xyz');
      });

      describe('onQueryChange ->', () => {
        it('should send notification about search change', (() => {
          component.onQueryChange('test');
          expect(mocks.urlParamsBrokerService.setParam).calledWith('q', 'test');
        }));
      });
    });
  });
});
