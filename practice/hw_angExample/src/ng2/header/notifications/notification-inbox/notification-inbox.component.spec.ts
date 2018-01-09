import {fakeAsync, tick} from '@angular/core/testing';
import {Deferred} from '../../../utils';
import {NotificationInboxComponent} from './notification-inbox.component';

const getMocks = () => ({
  appService: {
    getAppPath: sinon.stub()
  },
  notificationsService: {
    goToNotification: sinon.stub(),
    getUnreadNotifications: sinon.stub(),
    markNotificationsRead: sinon.stub()
  },
  globalEventsService: {
    on: sinon.stub(),
    off: sinon.stub()
  },
  messageService: {
    showErrorMessage: sinon.stub()
  }
});

describe('notifications ->', () => {
  describe('components ->', () => {
    describe('notification inbox component ->', () => {
      let mocks;
      let deferGet: Deferred;
      let deferMark: Deferred;
      let component: NotificationInboxComponent;

      beforeEach(() => {
        mocks = getMocks();

        component = new NotificationInboxComponent(
          <any> mocks.appService,
          <any> mocks.notificationsService,
          <any> mocks.globalEventsService,
          <any> mocks.messageService
        );
        component.ngOnInit();

        deferGet = new Deferred();
        deferMark = new Deferred();

        mocks.notificationsService.getUnreadNotifications.returns(deferGet.promise);
        mocks.notificationsService.markNotificationsRead.returns(deferMark.promise);
      });

      it('should exist', () => {
        expect(component).to.not.be.undefined;
      });

      it('should listen for newItems', () => {
        const newNotificationsHandler = (<any> component).newNotificationsHandler;

        expect(_.isFunction(newNotificationsHandler)).to.be.true;

        expect(mocks.globalEventsService.on).to.be.calledOnce
          .and.calledWith('notifications:newItems', newNotificationsHandler);
      });

      describe('openNotification() ->', () => {
        it('should open notification', () => {
          let item = { foo: 'bar' };
          component.openNotification(item);
          expect(mocks.notificationsService.goToNotification).calledWith(item);
        });
      });

      describe('getInboxNotifications() ->', () => {
        it('should request unread items', fakeAsync(() => {
          component.getInboxNotifications();

          expect(component.items).to.eql([]);
          expect(component.status).to.equal('loading');
          expect(mocks.notificationsService.getUnreadNotifications).calledOnce;

          deferGet.resolve({ data: { content: [1, 2, 3] } });
          tick();

          expect(component.items).to.eql([1, 2, 3]);
          expect(component.status).to.equal('done');
          expect(mocks.notificationsService.markNotificationsRead).calledWith([1, 2, 3]);
        }));

        it('should handle failure', fakeAsync(() => {
          component.getInboxNotifications();

          deferGet.reject();
          tick();

          expect(mocks.messageService.showErrorMessage).calledOnce;
        }));
      });

      describe('markRead() ->', () => {
        it('should skip empty list', () => {
          component.markRead([]);

          expect(mocks.notificationsService.markNotificationsRead).not.called;
        });

        it('should call service method and handle failure', fakeAsync(() => {
          component.markRead(['xxx']);
          expect(mocks.notificationsService.markNotificationsRead).calledWith(['xxx']);

          deferMark.reject();
          tick();

          expect(mocks.messageService.showErrorMessage).calledOnce;
        }));
      });
    });
  });
});
