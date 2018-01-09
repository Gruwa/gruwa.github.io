import * as _ from 'lodash';
import {Observable} from 'rxjs';
import {Inject, Injectable} from '@angular/core';
import {AppService} from '../../common/services/app/app.service';
import {ConfigService} from '../../common/services/config/config.service';
import {WindowService} from '../../common/services/window/window.service';

export interface IEnvInfo {
  title: string;
  api$: Observable<string>;
  ui$?: Observable<string>;
}

const MANIFEST_FILE = 'manifest.json';

@Injectable()
export class AboutEnvService {
  private apps: {title: string; apiInfoUrl: string; uiInfoUrl?: string}[] = [
    {
      title: 'Shell',
      apiInfoUrl: this.configService.getShellBaseURL() + 'info',
      uiInfoUrl: this.appService.getAppPath('shell') + MANIFEST_FILE
    },
    {
      title: 'CM',
      apiInfoUrl: this.configService.getCMBaseURL() + 'info',
      uiInfoUrl: this.appService.getAppPath('cm') + MANIFEST_FILE
    },
    {
      title: 'Creatives',
      apiInfoUrl: this.configService.getCREBaseURL() + 'info',
      uiInfoUrl: this.appService.getAppPath('creatives') + MANIFEST_FILE
    },
    {
      title: 'Mkt',
      apiInfoUrl: this.configService.getMktBaseUrl() + 'info',
      uiInfoUrl: this.appService.getAppPath('marketplace') + MANIFEST_FILE
    },
    {
      title: 'uTag',
      apiInfoUrl: this.configService.getTTAGBaseURL() + 'info',
      uiInfoUrl: this.appService.getAppPath('utag') + MANIFEST_FILE
    },
    {
      title: 'ATV',
      apiInfoUrl: this.configService.getATVBaseURL() + 'info',
      uiInfoUrl: this.appService.getAppPath('atv') + MANIFEST_FILE
    },
    {
      title: 'AMP',
      apiInfoUrl: this.configService.getAMPBaseURL() + 'info',
      uiInfoUrl: this.appService.getAppPath('amp') + MANIFEST_FILE
    },
    {
      title: 'Reports',
      apiInfoUrl: this.configService.getReportsBaseURL() + 'info',
      uiInfoUrl: this.appService.getAppPath('reporting') + MANIFEST_FILE
    },
    {
      title: 'CFD',
      apiInfoUrl: this.configService.getFinanceDbBaseUrl() + 'info',
      uiInfoUrl: this.appService.getAppPath('financedb') + MANIFEST_FILE
    },
    {
      title: 'CSF',
      apiInfoUrl: this.configService.getCSFBaseUrl() + 'info',
      uiInfoUrl: this.appService.getAppPath('csf') + MANIFEST_FILE
    },
    {
      title: 'UM',
      apiInfoUrl: this.configService.getUserInfoURL() + 'info'
    },
    {
      title: 'NC',
      apiInfoUrl: this.configService.getNotifiCenterBaseUrl() + 'info'
    }
  ];

  constructor(
    @Inject('$http') private $http: ng.IHttpService,
    @Inject(WindowService) private $window: Window,
    private appService: AppService,
    private configService: ConfigService
  ) {}

  getEnvInfo(): string {
    return this.$window.location.origin;
  }

  getAppInfo(): IEnvInfo[] {
    const timestamp = Date.now();
    return this.apps.map(app => {
      const result: IEnvInfo = {
        title: app.title,
        api$: Observable.fromPromise(this.getApiInfo(app.apiInfoUrl, timestamp))
      };

      if (app.uiInfoUrl) {
        result.ui$ = Observable.fromPromise(this.getUiInfo(app.uiInfoUrl, timestamp));
      }

      return result;
    });
  }

  // must return resolved promise, no matter of actual http response type
  getApiInfo(url: string, timestamp: number): Promise<string> {
    return new Promise(resolve => {
      let info: string;

      this.$http.get(url, {params: {t: timestamp}})
        .then(response => {
          const version = _.get(response, 'data.build.productVersion', '');
          const build = _.get(response, 'data.build.jenkinsBuildNumber', '');
          info = `${version}.${build}`;
        })
        .finally(() => resolve(info));
    });
  }

  // must return resolved promise, no matter of actual http response type
  getUiInfo(url: string, timestamp: number): Promise<string> {
    return new Promise(resolve => {
      let info: string;

      this.$http.get(url, {params: {t: timestamp}})
        .then(response => {
          const version = _.get(response, 'data.metadata.version', '');
          const build = _.get(response, 'data.metadata.build', '');
          const core = _.get(response, 'data.metadata.core', '');
          info = `${version}.${build} (${core})`;
        })
        .finally(() => resolve(info));
    });
  }
}
