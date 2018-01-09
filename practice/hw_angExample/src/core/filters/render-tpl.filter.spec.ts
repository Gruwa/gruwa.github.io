export default (ngModule) => {
  let filterName = 'renderTpl';
  describe(ngModule.name, () => {
    beforeEach(angular.mock.module(ngModule.name));

    describe('filters', () => {
      describe(filterName, () => {
        let renderTpl = null;

        beforeEach(angular.mock.inject((_$filter_) => {
          renderTpl = _$filter_('renderTpl');
        }));

        it('should be defined', () => {
          expect(renderTpl).to.exist;
        });

        describe('with label', () => {
          it('should return compiled tempate', () => {
            let item = [{ name: 'testCampaign' }, { name: 'testCampaignSecond' }];
            expect(renderTpl(item, '<% _.forEach(data, function(camp) {%><div><%- camp.name %></div><%});%>'))
              .to.be.equal('<div>testCampaign</div><div>testCampaignSecond</div>');
          });
        });
      });
    });
  });
};
