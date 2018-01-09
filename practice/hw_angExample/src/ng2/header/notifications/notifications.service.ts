import {IHttpPromiseCallbackArg} from 'angular';
import {Injectable, Inject} from '@angular/core';
import {LoggerService, WindowService, GlobalEventsService, ConfigService} from '../../common';
import {AuthService} from '../../../core/auth/services/auth.service';
import IEntityListResponse = cad.IEntityListResponse;
import INotification = cad.notifications.INotification;

const statesMap = {
  // key - generator id from notification object, value - name of notification handler state at sub-app
  'com.cadreon.unity:shell': 'shell.notificationHandler',
  'com.cadreon.unity:atv': 'advancedtv.notificationHandler',
  'com.cadreon.unity:utag': 'totaltag.notificationHandler',
  'com.cadreon.unity:cm': 'campaigns.notificationHandler',
  'com.cadreon.unity:reporting': 'reporting.notificationHandler',
  'com.cadreon.unity:amp': 'amp.notificationHandler',
  'com.cadreon.unity:cfd': 'financedb.notificationHandler',
  'com.cadreon.unity:csf': 'csf.notificationHandler',
  'com.cadreon.marketplace': 'marketplace.notificationHandler'
};

const NOTIFICATION = 'NOTIFICATION'; // type of server event with notification, to differentiate from others
const MAX_ATTEMPTS = 3; // number of attempts to re-establish SSE conection
const SUBSCRIBE_URL = 'unsecured/notifications/subscribe/'; // subscribe path

export interface INotificationStatus {
  key: string;
  title: string;
}

@Injectable()
export class NotificationsService {
  private unreadNumber = 0;
  private eventSource: cad.sse.IEventSourceStatic = null;
  private endpoints = {
    fetch: 'notifications',
    poll: 'notifications/poll',
    register: 'notifications/register',
    subscribe: SUBSCRIBE_URL,
    acknowledged: 'notifications/ack'
  };
  private attempts = 0;
  private statusList: INotificationStatus[] = [
    {
      key: 'read',
      title: this.$translate.instant('notification_center.filter.status_read')
    },
    {
      key: 'unread',
      title: this.$translate.instant('notification_center.filter.status_unread')
    }
  ];

  constructor(
    private loggerService: LoggerService,
    private globalEventsService: GlobalEventsService,
    private configService: ConfigService,
    @Inject(WindowService) private $window: cad.IWindow,
    @Inject('$http') private $http: ng.IHttpService,
    @Inject('$state') private $state: ng.ui.IStateService,
    @Inject('$q') private $q: ng.IQService,
    @Inject('$translate') private $translate: ng.translate.ITranslateService,
    @Inject('authService') private authService: AuthService
  ) {
    // append base url for every endpoint
    this.endpoints = <any> _.mapValues(this.endpoints, val => configService.getNotifiCenterBaseUrl() + val);
    // details CCS-1640
    if (!_.isEmpty(configService.notificenterURL)) {
      this.endpoints.subscribe = `${configService.notificenterURL}api/${SUBSCRIBE_URL}`;
    }
  }

  startPolling() {
    this.stopPolling(); // make sure any running polling has stopped
    if (this.authService.isAuthenticated()) {
      this.registerSession().then(this.subscribeForUpdates.bind(this));
    }
  }

  stopPolling() {
    if (this.eventSource) {
      this.eventSource.close();
    }
  }

  registerSession(): ng.IPromise<string> {
    return this.$http.get(this.endpoints.register)
      .then(response => {
        let data = <cad.notifications.IRegisterResponse> response.data;
        this.unreadNumber = data.totalElements;
        return this.$q.resolve(data.sessionId);
      })
      .catch(error => {
        this.loggerService.error('Failed to registerSession notifications session');
        return this.$q.reject(error);
      });
  }

  subscribeForUpdates(sid: string) {
    const url = this.endpoints.subscribe + sid;

    if (this.$window.EventSource) {
      this.eventSource = new this.$window.EventSource(url);
      this.eventSource.onmessage = this.processServerEvent.bind(this);
      this.eventSource.onerror = this.processError.bind(this);
    } else {
      this.loggerService.error('Notifications polling is not available as browser does not support SSE API');
    }
  }

  processServerEvent(event) {
    let data: cad.notifications.INotificationEventData<any>;

    try {
      data = angular.fromJson(event.data);
    } catch (e) {
      data = { type: 'bad_json' };
      this.loggerService.error('Invalid notification JSON');
    }

    if (data.type === NOTIFICATION) {
      this.globalEventsService.broadcast('notifications:newItems', [data.notification]);
      this.unreadNumber = data.totalElements;
    }
  }

  processError() {
    if (this.attempts < MAX_ATTEMPTS) {
      this.loggerService.error('Error occurred when listening server-sent events, reconnecting now');
      this.startPolling();
    }
    this.attempts++;
  }

  getAllNotifications(params = {}): ng.IPromise<any> {
    return this.$http.get(this.endpoints.fetch, params);
  }

  getUnreadNotifications(quantity = 1): ng.IPromise<any> {
    let config = {
      cache: false,
      params: {
        page: 0,
        size: quantity,
        sort: 'actionDate,desc'
      }
    };

    return this.$http.get(this.endpoints.poll, config);
  }

  markNotificationsRead(items: INotification<any>[]): ng.IPromise<INotification<any>[]> {
    let params = { ids: _.map(items, 'id') };

    return this.$http.post(this.endpoints.acknowledged, params).then((response: any) => {
      let data = <cad.notifications.IAcknowledgedResponse> response.data;

      // mark items as read
      data.ids.forEach(id => {
        let item: any = _.find(items, {id});
        if (item) {
          item.acknowledged = true;
        }
      });

      this.unreadNumber = data.totalElements;

      return response;
    });
  }

  getUnreadNumber(): number {
    return this.unreadNumber;
  }

  goToNotification(notification) {
    if (statesMap[notification.generator.type]) {
      this.$state.go(statesMap[notification.generator.type], {notification});
    }
  }

  /**
   * Loads notification by id and then redirect to the proper app
   *
   * @param id
   */
  getNotificationById(id: string): ng.IPromise<INotification<any>> {
    return this.$http.get(this.endpoints.fetch, {
      params: {
        filter_id: id
      }
    }).then(
      (resp: IHttpPromiseCallbackArg<IEntityListResponse<INotification<any>>>) => resp.data.content[0]
    );
  }

  getStatusList(): INotificationStatus[] {
    return _.cloneDeep(this.statusList);
  }
}
