import {TrackFormChangesController, ITrackOptions} from './track-form-changes.controller';

export default ngModule => {
  describe(ngModule.name, () => {
    describe('directives', () => {
      describe('cadTrackFormChanges', () => {
        let ctrl = null;
        let $scope;
        let $window;
        let $timeout;
        let authService;
        let trackChangesService;
        let options: ITrackOptions = {};
        let models: any = {};

        beforeEach(() => {
          angular.mock.module(ngModule.name, $urlRouterProvider => $urlRouterProvider.deferIntercept());
          angular.mock.inject(($controller, $rootScope, _$window_, _$timeout_) => {
            $scope = $rootScope.$new(true);
            $window = _$window_;
            $timeout = _$timeout_;
            authService = { isAuthenticated: () => true };
            trackChangesService = {
              equal: sinon.stub(),
              showPopup: sinon.stub().returns(Promise.resolve())
            };
            ctrl = $controller(
              TrackFormChangesController,
              {
                $scope,
                authService,
                trackChangesService
              },
              {
                form: {},
                externalOptions: options,
                modelsToTrack: models
              }
            );
          });
        });

        it('should exits', () => {
          expect(ctrl).to.not.null;
        });

        describe('$onInit', () => {
          let spy: any = {};

          beforeEach(() => {
            spy.addEventListener = sinon.spy($window, 'addEventListener');
            spy.initTracking = sinon.stub(ctrl, 'initTracking');
            options.manualRun = true;
            options.delay = 100;
          });

          afterEach(() => {
            spy.addEventListener.restore();
          });

          it('should define $scope event listeners', () => {
            ctrl.$onInit();
            expect($scope.$$listeners).to.have.property('$destroy');
            expect($scope.$$listeners).to.have.property('$stateChangeStart');
          });

          it('should define onbeforeunload event listener', () => {
            ctrl.$onInit();
            expect(spy.addEventListener).calledWith('beforeunload');
          });

          it('should merge external options with default internal', () => {
            ctrl.$onInit();
            expect(ctrl.options.manualRun).to.be.true;
            expect(ctrl.options.delay).to.equal(100);
          });

          it('should add method to form controller', () => {
            ctrl.$onInit();
            expect(ctrl.form.restartChangesTracking).to.exist;
          });

          it('should pause running tracking', () => {
            options.manualRun = false;
            ctrl.$onInit();
            expect(spy.initTracking).to.calledOnce;
          });
        });

        describe('initTracking()', () => {
          it('should run tracking via $timeout' , () => {
            options.manualRun = false;
            options.delay = 0;
            let spy = sinon.stub(ctrl, 'runTracking');
            ctrl.$onInit();
            $timeout.flush();
            expect(spy).to.calledOnce;
          });
        });

        describe('runTracking()', () => {
          it('should clear old watcher', () => {
            let spy = sinon.stub(ctrl, 'unregWatcher');
            ctrl.runTracking();
            expect(spy).to.calledOnce;
          });

          it('should copy models to internal prop', () => {
            models.prop = '111';
            ctrl.runTracking();
            expect(ctrl.originalData).to.eql({ prop: '111' });
          });

          it('should set new watcher', () => {
            let spy = sinon.spy($scope, '$watch');
            ctrl.runTracking();
            expect(spy).to.calledOnce;
          });

          it('should reset isModified prop', () => {
            ctrl.runTracking();
            expect(ctrl.form.isModified).to.be.false;
          });
        });

        describe('compare()', () => {
          beforeEach(() => {
            // Phantom doesn't have high performance timer out of the box, so let's mock it
            $window.performance = { now: angular.noop };
          });

          it('should call comparing function from service', () => {
            ctrl.$onInit();
            ctrl.compare([{a: {foo: 'bar'}}, {b: 111}]);
            expect(trackChangesService.equal).calledOnce;
          });
        });

        describe('onPageClosed()', () => {
          it('should do nothing if popup disabled', () => {
            options.showUnsavedPopup = false;
            ctrl.$onInit();
            let result = ctrl.onPageClosed();
            expect(result).to.be.undefined;
          });

          it('should return message if conditions match', () => {
            options.showUnsavedPopup = true;
            ctrl.form.isModified = true;
            ctrl.$onInit();
            let result = ctrl.onPageClosed({});
            expect(result).to.equal('form.unsaved_changes.statement');
          });
        });

        describe('onStateChange()', () => {
          it('should open popup', () => {
            options.showUnsavedPopup = true;
            ctrl.form.isModified = true;
            ctrl.$onInit();
            ctrl.onStateChange({ preventDefault: angular.noop}, {}, {});
            expect(trackChangesService.showPopup).calledOnce;
          });
        });
      });
    });
  });
};
