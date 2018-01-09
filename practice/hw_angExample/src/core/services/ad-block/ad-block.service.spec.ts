export default (ngModule) => {
  describe(ngModule.name, () => {
    let mocks = {
      configService: {
        checkAdBlock: true
      },
      blockAdBlock: {
        on: sinon.spy()
      }
    };

    beforeEach(angular.mock.module(ngModule.name, ($provide) => {
      $provide.value('configService', mocks.configService);
    }));

    describe('services', () => {
      describe('AdBlockService', () => {
        let adBlockService;
        let $window;
        let $uibModal;

        beforeEach(angular.mock.inject((_adBlockService_, _$window_, _$uibModal_) => {
          adBlockService = _adBlockService_;
          $window = _$window_;
          $uibModal = _$uibModal_;
          $window.blockAdBlock = mocks.blockAdBlock;
        }));

        describe('checkAdBlock()', () => {
          it('should check adBlock if configuration allow', () => {
            $window.blockAdBlock.on.reset();
            mocks.configService.checkAdBlock = true;

            adBlockService.checkAdBlock();

            expect($window.blockAdBlock.on).calledOnce;
          });
          it('should not check adBlock if configuration disallow', () => {
            $window.blockAdBlock.on.reset();
            mocks.configService.checkAdBlock = false;

            adBlockService.checkAdBlock();

            expect($window.blockAdBlock.on).not.called;
          });
        });

        describe('displayInfo()', () => {
          beforeEach(() => {
            sinon.stub($uibModal, 'open');
          });

          afterEach(() => {
            $uibModal.open.restore();
          });

          it('should show modal window', () => {
            adBlockService.displayInfo();

            expect($uibModal.open).calledOnce;
          });
        });
      });
    });
  });
};
