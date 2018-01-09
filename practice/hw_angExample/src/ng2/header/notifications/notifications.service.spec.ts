// tslint:disable:max-file-line-count

import {fakeAsync, tick} from '@angular/core/testing';
import {Deferred} from '../../utils';
import {NotificationsService} from './notifications.service';

const getMocks = () => ({
  loggerService: {
    error: sinon.stub()
  },
  globalEventsService: {
    broadcast: sinon.stub()
  },
  $window: {
    EventSource: sinon.stub()
  },
  configService: {
    getNotifiCenterBaseUrl: sinon.stub()
  },
  $http: {
    get: sinon.stub(),
    post: sinon.stub()
  },
  $state: {
    go: sinon.stub()
  },
  $q: {
    error: sinon.stub(),
    resolve: sinon.stub(),
    reject: sinon.stub()
  },
  $translate: {
    instant: sinon.stub()
  },
  authService: {
    isAuthenticated: sinon.stub().returns(true)
  }
});

describe('notifications ->', () => {
  describe('services ->', () => {
    describe('notificationsService ->', () => {
      let mocks;
      let service: NotificationsService;

      function createService(): NotificationsService {
        return new NotificationsService(
          mocks.loggerService,
          mocks.globalEventsService,
          mocks.configService,
          mocks.$window,
          mocks.$http,
          mocks.$state,
          mocks.$q,
          mocks.$translate,
          mocks.authService
        );
      }

      beforeEach(() => mocks = getMocks());

      describe('startPolling() ->', () => {
        let defer: Deferred;
        let spy;

        beforeEach(() => {
          service = createService();
          defer = new Deferred();
          spy = {
            stop: sinon.stub(service, 'stopPolling'),
            register: sinon.stub(service, 'registerSession').returns(defer.promise),
            subscribe: sinon.stub(service, 'subscribeForUpdates')
          };
        });

        it('should not start when not authorised', () => {
          mocks.authService.isAuthenticated.returns(false);
          service.startPolling();
          expect(mocks.authService.isAuthenticated).calledOnce;
          expect(spy.register).not.called;
        });

        it('should follow workflow stop polling -> register -> subscribe', fakeAsync(() => {
          service.startPolling();

          defer.resolve();
          tick();

          expect(spy.stop).calledOnce;
          expect(spy.register).calledOnce;
          expect(spy.subscribe).calledOnce;
        }));

        // TODO: Find out how to handle defer.reject() correctly
        it.skip('should not subscribe if register fails', fakeAsync(() => {
          service.startPolling();

          defer.reject();
          tick();

          expect(spy.register).calledOnce;
          expect(spy.subscribe).not.called;
        }));
      });

      describe('stopPolling() ->', () => {
        it('should call close()', () => {
          let closeSpy = sinon.spy();

          mocks.$window.EventSource.returns({ close: closeSpy });

          service = createService();
          service.subscribeForUpdates('aaa-bbb');
          service.stopPolling();
          expect(closeSpy).calledOnce;
        });
      });

      describe('registerSession() ->', () => {
        let defer: Deferred;

        let resp = { data: {
          sessionId: 'aaa-bbb',
          totalElements: 42
        }};

        beforeEach(() => {
          defer = new Deferred();
          mocks.$http.get.returns(defer.promise);
          mocks.$q.resolve.returns(resp.data.sessionId);
          service = createService();
        });

        it('should call API', () => {
          service.registerSession();
          expect(mocks.$http.get).calledOnce.and.calledWithMatch('register');
        });

        it('should process successful backend call', () => {
          service.registerSession().then((sid) => {
            expect(sid).to.equal(resp.data.sessionId);
            expect(service.getUnreadNumber()).to.equal(resp.data.totalElements);
          });

          defer.resolve(resp);
        });

        it('should process failed backend call', fakeAsync(() => {
          service.registerSession();

          defer.reject();
          tick();

          expect(mocks.loggerService.error).calledOnce;
        }));
      });

      describe('subscribeForUpdates() ->', () => {
        it('should create EventSource is available', () => {
          service = createService();
          service.subscribeForUpdates('aaa-bbb');
          expect(mocks.$window.EventSource).calledOnce;
        });

        it('should put some text to log if EventSource is not available', () => {
          mocks.$window.EventSource = null;
          service = createService();
          service.subscribeForUpdates('aaa-bbb');
          expect(mocks.loggerService.error).calledOnce;
        });
      });

      describe('processServerEvent() ->', () => {
        beforeEach(() => {
          service = createService();
        });

        it('should handle invalid json', () => {
          let event = { data: 'abra-kadabra' };
          service.processServerEvent(event);
          expect(mocks.loggerService.error).calledOnce;
        });

        it('should process notification', () => {
          let data = {
            type: 'NOTIFICATION',
            notification: { foo: 'bar' },
            totalElements: 42
          };
          let event = { data: angular.toJson(data) };

          service.processServerEvent(event);

          expect(mocks.loggerService.error).not.calledOnce;
          expect(service.getUnreadNumber()).to.equal(data.totalElements);
          expect(mocks.globalEventsService.broadcast).calledWith('notifications:newItems', [data.notification]);
        });
      });

      describe('processError() ->', () => {
        it('should restart polling', () => {
          service = createService();
          let startSpy = sinon.stub(service, 'startPolling');

          service.processError();

          expect(mocks.loggerService.error).calledOnce;
          expect(startSpy).calledOnce;
        });

        it('should restart polling no more than 3 time in a row', () => {
          service = createService();
          let startSpy = sinon.stub(service, 'startPolling');

          service.processError();
          service.processError();
          service.processError();
          // this fourth call shouldn't trigger restart
          service.processError();

          expect(mocks.loggerService.error).callCount(3);
          expect(startSpy).callCount(3);
        });
      });

      describe('getAllNotifications() ->', () => {
        it('should call API with passed params', () => {
          service = createService();
          service.getAllNotifications({ foo: 'bar' });
          expect(mocks.$http.get).calledWithMatch('notifications', { foo: 'bar' });
        });

        it('should call API with default params', () => {
          service = createService();
          service.getAllNotifications();
          expect(mocks.$http.get).calledWithMatch('notifications');
        });
      });

      describe('getUnreadNotifications() ->', () => {
        it('should call API with passed params', () => {
          service = createService();
          service.getUnreadNotifications(42);
          expect(mocks.$http.get).calledWithMatch('/poll', { params: { size: 42 }});
        });

        it('should call API with default params', () => {
          service = createService();
          service.getUnreadNotifications();
          expect(mocks.$http.get).calledWithMatch('/poll');
        });
      });

      describe('markNotificationsRead() ->', () => {
        let defer: Deferred;

        beforeEach(() => {
          defer = new Deferred();
          mocks.$http.post.returns(defer.promise);
          service = createService();
        });

        it('should call API', () => {
          service.markNotificationsRead(<any> [{ id: 'xxx' }]);
          expect(mocks.$http.post).calledWithMatch('/ack', { ids: ['xxx'] });
        });

        it('should mark items read on success response', fakeAsync(() => {
          let items: any = [{ id: 'xxx' }, { id: 'yyy' }];
          let data = {
            ids: ['xxx', 'zzz'],
            totalElements: 42
          };

          service.markNotificationsRead(items);
          defer.resolve({ data });
          tick();

          expect(items[0].acknowledged).to.be.true;
          expect(items[1].acknowledged).to.not.be.ok; // here could be undefined or false, thus use ".ok"
          expect(service.getUnreadNumber()).to.equal(data.totalElements);
        }));
      });

      describe('goToNotification() ->', () => {
        it('should go to defined state', () => {
          service = createService();
          service.goToNotification({ generator: { type: 'com.cadreon.unity:shell' } });
          expect(mocks.$state.go).calledOnce;
        });

        it('should skip fake notifications', () => {
          service = createService();
          service.goToNotification({ generator: 'aaa' });
          expect(mocks.$state.go).not.called;
        });
      });
    }); // "notificationsService"
  }); // "services"
}); // module
