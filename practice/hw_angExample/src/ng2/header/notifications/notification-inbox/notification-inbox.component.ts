import {Component, Inject, OnInit, OnDestroy} from '@angular/core';
import {AppService, GlobalEventsService} from '../../../common';
import {MessageService} from '../../../message';
import {NotificationsService} from '../notifications.service';

@Component({
  selector: 'cad-notification-inbox',
  template: require('./notification-inbox.html'),
  styles: [require('./notification-inbox.scss')]
})
export class NotificationInboxComponent implements OnInit, OnDestroy {
  items = [];
  status = 'loading';
  isOpened = false;
  notificationsFeedLink: string;
  private displayLimit = 5;
  private newNotificationsHandler: Function;

  constructor(
    private appService: AppService,
    private notificationsService: NotificationsService,
    private globalEventsService: GlobalEventsService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.notificationsFeedLink = this.appService.getAppPath('shell') + '#/notifications';

    this.newNotificationsHandler = this.getInboxNotifications.bind(this);
    this.globalEventsService.on('notifications:newItems', this.newNotificationsHandler);
  }

  ngOnDestroy() {
    this.globalEventsService.off('notifications:newItems', this.newNotificationsHandler);
  }

  onToggle(isOpened: boolean): void {
    this.isOpened = isOpened;
    if (isOpened) {
      this.getInboxNotifications();
    }
  }

  unreadNumber(): number {
    return this.notificationsService.getUnreadNumber();
  }

  openNotification(item): void {
    this.notificationsService.goToNotification(item);
  }

  getInboxNotifications() {
    this.items = [];
    this.status = 'loading';

    this.notificationsService.getUnreadNotifications(this.displayLimit)
      .then(response => {
        this.items = response.data.content;
        this.markRead(this.items);
      })
      .catch(() => {
        this.messageService.showErrorMessage('notifications.api_error');
      })
      .finally(() => {
        this.status = 'done';
      });
  }

  markRead(items: any[]) {
    if (_.isEmpty(items)) { return; }

    this.notificationsService.markNotificationsRead(items).catch(() => {
      this.messageService.showErrorMessage('notifications.api_error');
    });
  }

  close() {
    this.isOpened = false;
  }

  trackByFn(index: number, item): number {
    return item.id;
  }
}
