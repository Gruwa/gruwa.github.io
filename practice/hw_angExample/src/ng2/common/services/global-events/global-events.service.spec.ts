import {GlobalEventsService} from './global-events.service';

describe('UnityCommonServicesModule ->', () => {
  describe('GlobalEventsService ->', () => {
    let service: GlobalEventsService;

    beforeEach(() => {
      service = new GlobalEventsService();
    });

    describe('General workflow ->', () => {
      context('Firing events', () => {
        let spy1;
        let spy2;
        let offSpy1;
        let offSpy2;

        beforeEach(() => {
          spy1 = sinon.spy();
          spy2 = sinon.spy();

          offSpy1 = service.on('test', spy1);
          offSpy2 = service.on('test', spy2);
        });

        it('should invoke two subscribers', () => {
          service.broadcast('test');

          expect(spy1).calledOnce;
          expect(spy2).calledOnce;
        });

        it('should not invoke subscribers for different event', () => {
          service.broadcast('test2');

          expect(spy1).not.called;
          expect(spy2).not.called;
        });

        it('should unsubscribe and have not been invoked', () => {
          service.off('test', spy1);
          service.broadcast('test');

          expect(spy1).not.called;
          expect(spy2).calledOnce;
        });

        it('should be invoked with params', () => {
          let a = {};
          service.broadcast('test', 1, 2, 'test', a);

          expect(spy1).calledWith(1, 2, 'test', a);
        });

        it('unsubscribe from event by invoking function result of subscription', () => {
          offSpy1();
          offSpy2();
          service.broadcast('test');

          expect(spy1).not.called;
          expect(spy2).not.called;
        });
      });

    });

  });
});
