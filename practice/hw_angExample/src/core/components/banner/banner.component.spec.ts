import {BannerController} from './banner.component';

const MODULE_NAME = 'cadreon.core.components';

let ctrl: BannerController;
let bannerService;

class BannerServiceMock {
  getBannerMessage = sinon.stub().returns('some message');
}

function createController() {
  angular.mock.inject(($controller: ng.IControllerService) => {
    bannerService = new BannerServiceMock();
    ctrl = $controller(BannerController, {bannerService});
  });
}

// Test Suit here --------------------------------------------------------------
export default describe(MODULE_NAME, () => {
  beforeEach(angular.mock.module(MODULE_NAME));
  beforeEach(createController);

  describe('controllers', () => {
    describe('BannerController', () => {
      describe('#getBannerMessage()', () => {
        it('get banner message', () => {
          ctrl.getBannerMessage();

          expect(bannerService.getBannerMessage).to.have.been.calledOnce;
        });
      });
    });

    describe('BannerController', () => {
      describe('#isBannerShown()', () => {
        it('returns true, if message set', () => {
          let isBannerShown = ctrl.isBannerShown();

          expect(bannerService.getBannerMessage).to.have.been.calledOnce;
          expect(isBannerShown).to.be.true;
        });
      });
    });
  });
});
