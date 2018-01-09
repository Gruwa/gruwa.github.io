export interface IInsightsProject {
  uid: string;
  name: string;
}

export interface IInsightsWorkbook {
  uid: string;
  name: string;
}

export interface IInsightsView {
  uid: string;
  name: string;
  contentUrl: string;
}

export interface IInsightsRule {
  id: number;
  project: IInsightsProject;
  workbook: IInsightsWorkbook;
  view: IInsightsView;
}

export class InsightsService {
  private defaultConfig = {
    cache: true,
    prefix: 'reports'
  };

  private defaultRuleConfig = angular.extend({}, this.defaultConfig, {
    cache: false
  });

  constructor(private $http: ng.IHttpService) {
    'ngInject';
  }

  getProjects(): ng.IPromise<IInsightsProject[]> {
    return this.$http.get<IInsightsProject[]>('insights/projects', this.defaultConfig).then(response => response.data);
  }

  getWorkbooks(projectId: string): ng.IPromise<IInsightsWorkbook[]> {
    const url = `insights/projects/${projectId}/workbooks`;
    return this.$http.get<IInsightsWorkbook[]>(url, this.defaultConfig).then(response => response.data);
  }

  getViews(projectId: string, workbookId: string): ng.IPromise<IInsightsView[]> {
    const url = `insights/projects/${projectId}/workbooks/${workbookId}/views`;
    return this.$http.get<IInsightsView[]>(url, this.defaultConfig).then(response => response.data);
  }

  getUserRules(userName: string): ng.IPromise<IInsightsRule[]> {
    const url = `insights/${userName}/rules`;
    return this.$http.get<IInsightsRule[]>(url, this.defaultRuleConfig).then(response => response.data);
  }

  addUserRule(userName: string,
              project: IInsightsProject,
              workbook: IInsightsWorkbook,
              view: IInsightsWorkbook): ng.IPromise<IInsightsRule> {
    const url = `insights/${userName}/rules`;
    let params: {
      projectId?: string;
      workbookId?: string;
      viewId?: string;
    } = {};

    if (project) {
      params.projectId = project.uid;
    }
    if (workbook) {
      params.workbookId = workbook.uid;
    }
    if (view) {
      params.viewId = view.uid;
    }
    let config = angular.extend({}, this.defaultRuleConfig, {
      url,
      method: 'POST',
      params,
      paramSerializer: '$httpParamSerializerJQLike'
    });
    return this.$http<IInsightsRule>(config).then(response => response.data);
  }

  deleteUserRule(userName: string, rule: IInsightsRule): ng.IHttpPromise<{}> {
    let url = `insights/${userName}/rules/${rule.id}`;
    return this.$http.delete(url, this.defaultRuleConfig);
  }
}
