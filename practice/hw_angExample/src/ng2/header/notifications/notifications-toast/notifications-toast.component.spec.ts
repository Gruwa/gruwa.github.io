import {NotificationsToastComponent} from './notifications-toast.component';
import {b64EncodeUnicode} from '../../../../core/utils/b64';

const getMocks = () => ({
  notificationsService: {
    goToNotification: sinon.stub(),
    markNotificationsRead: sinon.stub()
  },
  globalEventsService: {
    on: sinon.stub(),
    off: sinon.stub()
  },
  $window: {
    sessionStorage: {
      getItem: sinon.stub(),
      setItem: sinon.stub(),
      removeItem: sinon.stub()
    }
  },
  $rootScope: {
    $on: sinon.stub(),
    $broadcast: sinon.stub()
  },
  $state: {
    go: sinon.stub()
  }
});

describe('notifications ->', () => {
  describe('components ->', () => {
    describe('notifications toast component ->', () => {
      let mocks;
      let $window;
      let component;

      beforeEach(() => {
        mocks = getMocks();

        component = new NotificationsToastComponent(
          <any> mocks.notificationsService,
          <any> mocks.globalEventsService,
          <any> mocks.$window,
          <any> mocks.$rootScope,
          <any> mocks.$state
        );
      });

      it('should exist', () => {
        expect(component).to.not.be.undefined;
        expect(component.notifications).to.be.empty;
        expect(component.isToastVisible).to.be.false;
      });

      describe('ngOnInit() ->', () => {
        it('should subscribe to notifications:newItems', () => {
          component.ngOnInit();

          expect(_.isFunction(component.newNotificationsHandler)).to.be.true;

          expect(mocks.globalEventsService.on).to.be.calledOnce
            .and.calledWith('notifications:newItems', component.newNotificationsHandler);
        });

        it('should subscribe to $rootScope logout-success', () => {
          component.ngOnInit();

          expect(mocks.$rootScope.$on).to.be.calledOnce;
        });

        it('should load saved notifications from storage', () => {
          const loadFromStorage = sinon.stub(component, 'loadNotificationsFromStorage').returns(['aaa', 'bbb', 'ccc']);
          const processNotifications = sinon.spy(component, 'processNewNotifications');
          component.ngOnInit();

          expect(loadFromStorage).calledOnce;
          expect(processNotifications).calledWith(['aaa', 'bbb', 'ccc']);
          expect(component.notifications).to.eql(['aaa', 'bbb']);
          expect(component.topItem).to.equal('ccc');
        });
      });

      describe('processNewNotifications() ->', () => {
        it('should add new items to the existing list', () => {
          component.notifications = ['aaa', 'bbb'];
          component.topItem = 'ccc';
          component.processNewNotifications(['ddd', 'eee']);

          expect(component.isToastVisible).to.be.true;
          expect(component.notifications).to.eql(['aaa', 'bbb', 'ccc', 'ddd']);
          expect(component.topItem).to.equal('eee');
        });

        it('should add new items to empty list', () => {
          component.notifications = [];
          component.processNewNotifications(['aaa', 'bbb']);

          expect(component.isToastVisible).to.be.true;
          expect(component.notifications).to.eql(['aaa']);
          expect(component.topItem).to.equal('bbb');
        });
      });

      describe('nextItem() ->', () => {
        it('should get top item from the list', () => {
          const stub = sinon.spy(component, 'saveNotificationsToStorage');
          component.notifications = ['aaa', 'bbb', 'ccc'];
          component.nextItem();
          expect(stub).calledOnce;
          expect(component.notifications).to.eql(['aaa', 'bbb']);
          expect(component.topItem).to.equal('ccc');
        });

        it('should get top item from the list - edge case', () => {
          const stub = sinon.spy(component, 'saveNotificationsToStorage');
          component.notifications = ['aaa'];
          component.nextItem();
          expect(stub).calledOnce;
          expect(component.notifications).to.eql([]);
          expect(component.topItem).to.equal('aaa');
        });

        it('should call closeAll() on empty list', () => {
          let closeSpy = sinon.stub(component, 'closeAll');
          component.notifications = [];
          component.nextItem();
          expect(closeSpy).calledOnce;
        });
      });

      describe('viewItem() ->', () => {
        it('should open notification and close', () => {
          let closeSpy = sinon.stub(component, 'closeAll');
          component.topItem = 'aaa';
          component.viewItem();
          expect(mocks.notificationsService.goToNotification).calledWith('aaa');
          expect(mocks.notificationsService.markNotificationsRead).calledWith(['aaa']);
          expect(closeSpy).calledOnce;
        });
      });

      describe('closeAll() ->', () => {
        it('should reset state', () => {
          const stub = sinon.spy(component, 'saveNotificationsToStorage');
          component.notifications = ['bla-bla-bla'];
          component.topItem = 'bla-bla-bla';
          component.isToastVisible = true;
          component.closeAll();
          expect(component.notifications).to.be.empty;
          expect(component.topItem).to.be.null;
          expect(component.isToastVisible).to.be.false;
          expect(stub).calledOnce;
        });
      });

      describe('viewAll() ->', () => {
        it('should close and go to another page', () => {
          let closeSpy = sinon.stub(component, 'closeAll');
          component.viewAll();
          expect(closeSpy).calledOnce;
          expect(mocks.$state.go).calledOnce;
        });
      });

      describe('loadNotificationsFromStorage() ->', () => {
        it('should load data from local storage', () => {
          component.loadNotificationsFromStorage();
          expect(mocks.$window.sessionStorage.getItem).calledWith('toastNotifications');
        });

        it('should decode loaded data', () => {
          const data = [{foo: 'bar'}];
          mocks.$window.sessionStorage.getItem.returns(b64EncodeUnicode(angular.toJson(data)));
          expect(component.loadNotificationsFromStorage()).to.eql(data);
        });
      });

    });
  });
});
