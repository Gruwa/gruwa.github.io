import {InsightsService} from './insights.service';

export default (ngModule) => {
  describe(ngModule.name, () => {
    let mocks = {
      $http: <any> sinon.stub()
    };

    mocks.$http.get = sinon.stub();
    mocks.$http.delete = sinon.stub();

    beforeEach(angular.mock.module(ngModule.name, ($urlRouterProvider, $provide) => {
      $provide.value('$http', mocks.$http);
    }));

    describe('InsightsService', () => {
      let service: InsightsService;

      let defaultConfig = {
        cache: true,
        prefix: 'reports'
      };
      let defaultRuleConfig = {
        cache: false,
        prefix: 'reports'
      };

      beforeEach(angular.mock.inject(($q: ng.IQService, $controller) => {
        let defer = $q.defer();

        mocks.$http.get.returns(defer.promise);
        mocks.$http.returns(defer.promise);
        service = $controller(InsightsService);
      }));

      afterEach(() => {
        mocks.$http.get.reset();
        mocks.$http.reset();
      });

      describe('methods', () => {
        describe('getProjects', () => {
          it('calls valid url', () => {
            let url = 'insights/projects';

            service.getProjects();
            expect(mocks.$http.get).calledOnce.and.calledWith(url, defaultConfig);
          });
        });

        describe('getWorkbooks', () => {
          it('calls valid url', () => {
            let projectId = 'aaaId';
            let url = `insights/projects/${projectId}/workbooks`;

            service.getWorkbooks(projectId);
            expect(mocks.$http.get).calledOnce.and.calledWith(url, defaultConfig);
          });
        });

        describe('getViews', () => {
          it('calls valid url', () => {
            let projectId = 'aaaId';
            let workbookId = 'zxczxc';
            let url = `insights/projects/${projectId}/workbooks/${workbookId}/views`;

            service.getViews(projectId, workbookId);
            expect(mocks.$http.get).calledOnce.and.calledWith(url, defaultConfig);
          });
        });

        describe('getUserRules', () => {
          it('call valid url', () => {
            const userName = 'bestic';
            let url = `insights/${userName}/rules`;

            service.getUserRules(userName);
            expect(mocks.$http.get).calledOnce.and.calledWith(url, defaultRuleConfig);
          });
        });

        describe('addUserRule()', () => {
          let project: any = {};
          let workbook: any = {};
          let view: any = {};

          let userName = 'bestic';
          let url = `insights/${userName}/rules`;

          beforeEach(() => {
            project = {};
            workbook = {};
            view = {};
          });

          it('call valid url and params', () => {
            service.addUserRule(userName, project, workbook, view);

            expect(mocks.$http).calledWithMatch({
              url,
              params: {},
              method: 'POST',
              paramSerializer: '$httpParamSerializerJQLike'
            });

          });

          it('should add projectId if it is not empty', () => {
            project = {
              uid: 1
            };

            service.addUserRule(userName, project, workbook, view);
            expect(mocks.$http).calledWithMatch({
              params: {
                projectId: 1
              }
            });
          });

          it('should add workbook if it is not empty', () => {
            workbook = {
              uid: 1
            };

            service.addUserRule(userName, project, workbook, view);
            expect(mocks.$http).calledWithMatch({
              params: {
                workbookId: 1
              }
            });
          });

          it('should add view if it is not empty', () => {
            view = {
              uid: 1
            };

            service.addUserRule(userName, project, workbook, view);
            expect(mocks.$http).calledWithMatch({
              params: {
                viewId: 1
              }
            });
          });
        });

        describe('deleteUserRule()', () => {
          it('call valid url', () => {
            const userName = 'bestic';
            const rule: any = {
              id: 1
            };
            let url = `insights/${userName}/rules/${rule.id}`;

            service.deleteUserRule(userName, rule);
            expect(mocks.$http.delete).calledOnce.and.calledWith(url, defaultRuleConfig);
          });
        });
      });
    });
  });
};
