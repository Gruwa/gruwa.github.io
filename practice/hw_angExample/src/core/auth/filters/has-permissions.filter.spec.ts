import {CadHasPermissions} from './has-permissions.filter';

export default (ngModule) => {
  describe(ngModule.name, () => {
    describe('filters', () => {
      describe('cadHasPermissions', () => {
        it('should ask currentUserService for result', () => {
          let currentUserService = {
            hasPermissions: sinon.stub()
          };
          let filter = CadHasPermissions(<any> currentUserService);
          filter('aaa', 'bbb');
          expect(currentUserService.hasPermissions).calledWith('aaa', 'bbb');
        });
      });
    });
  });
};
