import {Injectable, Inject} from '@angular/core';
import {WindowService, LoggerService, GlobalEventsService} from '../../common';
import {ConfigService} from '../../common/services/config/config.service';

export interface IBackgroundProcess {
  id: number;
  name: string;
  appId: string;
  processType: string;
  status: 'PROGRESS' | 'SUCCESS' | 'FAILED';
  processLink: string;
  actionTime: string;
  username: string;
  acknowledged: boolean;
}

export interface IBackgroundProcessFilter {
  filter_username_eq?: string;     // 'user3'
  filter_status_in?: string;       // 'FAILED,SUCCESS'
  filter_actionTime_gt?: string;   // '1999-06-02T09:30:42'
  filter_actionTime_le?: string;   // '2020-06-02T09:30:42'
  filter_acknowledged_eq?: boolean;
}

interface IBackgroundProcessesSession {
  sessionId: string;
}

interface IBackgroundProcessEventData {
  process: IBackgroundProcess;
  totalElements: number;
}

@Injectable()
export class BackgroundProcessesService {
  private baseUrl = `${this.configService.getNotifiCenterBaseUrl()}processes/`;
  private baseUnsecuredUrl = `${this.configService.getNotifiCenterBaseUrl()}unsecured/processes/`;

  private eventSource: cad.sse.IEventSourceStatic;
  private sseConnectionAttemptsLimit = 3; // number of attempts to re-establish SSE conection
  private sseConnectionAttempts = 0;

  constructor(
    @Inject(WindowService) private $window: cad.IWindow,
    @Inject('$http') private $http: ng.IHttpService,
    private configService: ConfigService,
    private loggerService: LoggerService,
    private globalEventsService: GlobalEventsService
  ) {}

  fetch(params?: IBackgroundProcessFilter): Promise<IBackgroundProcess[]> {
    return this.$http
      .get<cad.IEntityListResponse<IBackgroundProcess>>(this.baseUrl, {params})
      .then(resp => resp.data.content);
  }

  acknowledge(ids: number[]): Promise<{}> {
    return this.$http.put(`${this.baseUrl}ack`, {ids});
  }

  startPolling() {
    this.stopPolling(); // make sure any running polling has stopped
    this.registerForUpdates().then(sid => this.subscribeForUpdates(sid));
  }

  stopPolling() {
    if (this.eventSource) {
      this.eventSource.close();
    }
  }

  private registerForUpdates() {
    return this.$http
      .get<IBackgroundProcessesSession>(`${this.baseUrl}register`)
      .then(response => response.data.sessionId);
  }

  private subscribeForUpdates(sid: string) {
    const url = `${this.baseUnsecuredUrl}subscribe/${sid}`;

    if (this.$window.EventSource) {
      this.eventSource = new this.$window.EventSource(url);
      this.eventSource.onmessage = this.processServerEvent.bind(this);
      this.eventSource.onerror = this.processError.bind(this);
    } else {
      this.loggerService.error('Background processes updates is not available as browser does not support SSE API');
    }
  }

  private processServerEvent(event) {
    try {
      const data: IBackgroundProcessEventData = JSON.parse(event.data);
      this.globalEventsService.broadcast('backgroundProcesses:newItem', data.process);
    } catch (e) {
      this.loggerService.error('Invalid JSON in server event data');
    }
  }

  private processError() {
    if (this.sseConnectionAttempts < this.sseConnectionAttemptsLimit) {
      this.loggerService.error('Error occurred when listening server-sent events, reconnecting now');
      this.startPolling();
    }
    this.sseConnectionAttempts++;
  }
}
