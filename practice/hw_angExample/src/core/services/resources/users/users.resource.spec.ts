import {UsersResource} from './users.resource';

export default (ngModule) => {
  describe(ngModule.name, () => {
    describe('resources', () => {
      describe('User', () => {
        let User;

        it('should exists', () => {
          expect(UsersResource).to.exist;
        });

        it('should return resource', () => {
          const mock = {
            $resource: sinon.stub(),
            configService: <any> {
              getUserInfoURL: sinon.stub()
            }
          };

          User = UsersResource(mock.$resource, mock.configService);
          expect(mock.configService.getUserInfoURL).calledOnce;
          expect(mock.$resource).calledOnce;
        });
      });
    });
  });
};
