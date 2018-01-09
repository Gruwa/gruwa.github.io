import {AllowedForMarkets} from './allowed-for-markerts.filter';

export default (ngModule) => {
  describe(ngModule.name, () => {
    describe('filters', () => {
      describe('cadAllowedForMarkets', () => {
        it('should ask currentUserService for result', () => {
          let currentUserService = {
            isActiveMarketWithin: sinon.stub()
          };
          let filter = AllowedForMarkets(<any> currentUserService);
          filter(['US']);
          expect(currentUserService.isActiveMarketWithin).calledWith(['US']);
        });
      });
    });
  });
};
