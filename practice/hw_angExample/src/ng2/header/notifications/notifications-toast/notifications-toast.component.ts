import {Component, OnInit, OnDestroy, Inject} from '@angular/core';
import {b64EncodeUnicode, b64DecodeUnicode} from '../../../../core/utils/b64';
import {WindowService, GlobalEventsService} from '../../../common';
import {NotificationsService} from '../notifications.service';

@Component({
  selector: 'cad-notifications-toast',
  template: require('./notifications-toast.html'),
  styles: [require('./notifications-toast.scss')]
})
export class NotificationsToastComponent implements OnInit, OnDestroy {
  notifications: any[] = []; // this is actually list of hidden notifications for "view more notifications" link
  topItem: any = null;
  isToastVisible: Boolean = false;

  private newNotificationsHandler: Function;

  constructor(
    private notificationsService: NotificationsService,
    private globalEventsService: GlobalEventsService,
    @Inject(WindowService) private $window: Window,
    @Inject('$rootScope') private $rootScope: ng.IRootScopeService,
    @Inject('$state') private $state: angular.ui.IStateService
  ) {
    this.newNotificationsHandler = this.processNewNotifications.bind(this);
    this.globalEventsService.on('notifications:newItems', this.newNotificationsHandler);

    $rootScope.$on('logout-success', () => this.closeAll());
  }

  ngOnInit() {
    const savedNotifications = this.loadNotificationsFromStorage();
    if (savedNotifications.length) {
      this.processNewNotifications(savedNotifications);
    }
  }

  ngOnDestroy() {
    this.globalEventsService.off('notifications:newItems', this.newNotificationsHandler);
  }

  nextItem() {
    if (this.notifications.length) {
      this.saveNotificationsToStorage(); // must be before "pop()" to save top item as well
      this.topItem = this.notifications.pop();
    } else {
      this.closeAll();
    }
  }

  viewItem() {
    this.notificationsService.goToNotification(this.topItem);
    this.notificationsService.markNotificationsRead([this.topItem]);
    this.closeAll();
  }

  closeAll() {
    this.notifications = [];
    this.topItem = null;
    this.isToastVisible = false;
    this.saveNotificationsToStorage();
  }

  viewAll() {
    this.closeAll();
    this.$state.go('home.notifications', {}, { reload: true, inherit: false });
  }

  private processNewNotifications(newItems: any[]) {
    // if there's any visible item - return it back to list before adding new items
    if (!_.isEmpty(this.topItem)) {
      this.notifications.push(this.topItem);
    }
    // append new notifications to existing
    [].push.apply(this.notifications, _.cloneDeep(newItems));
    this.nextItem();
    this.isToastVisible = true;
  }

  private loadNotificationsFromStorage(): any[] {
    let notifications = [];
    try {
      notifications = angular.fromJson(b64DecodeUnicode(this.$window.sessionStorage.getItem('toastNotifications')));
    } catch (e) {
      notifications = [];
    }
    return notifications;
  }

  private saveNotificationsToStorage() {
    // use session storage keep saved notifications only inside one tab
    if (_.isEmpty(this.notifications)) {
      this.$window.sessionStorage.removeItem('toastNotifications');
    } else {
      this.$window.sessionStorage.setItem('toastNotifications', b64EncodeUnicode(angular.toJson(this.notifications)));
    }
  }
}
