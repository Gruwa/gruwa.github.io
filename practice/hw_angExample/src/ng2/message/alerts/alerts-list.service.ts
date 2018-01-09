import * as moment from 'moment';
import {Toast} from 'ng2-toastr';
import {Inject, Injectable} from '@angular/core';
import {IPaginatedResponse} from '../../../core/components/pagination/pagination';
import {ConfigService} from '../../common/services/config/config.service';
import {SystemToastMessageService} from './../system/system-toast-message.service';

export interface IAlertMessage {
  id: number;
  startDate: string;
  endDate: string;
  timeZone: string;
  description: string;
  createdBy: string;
  modifiedBy: string;
}

@Injectable()
export class AlertListService {
  baseUrl: string;

  constructor(
    private configService: ConfigService,
    private systemToastMessageService: SystemToastMessageService,
    @Inject('$http') private $http: ng.IHttpService
  ) {
    this.baseUrl = configService.getNotifiCenterBaseUrl() + 'alerts';

    this.systemToastMessageService.onCloseClick((toast: Toast) => {
      if (_.get(toast, 'data.id')) {
        const data = <any> toast.data;
        this.markAsRead(data.id);
      }
    });
  }

  showSystemMessagesIfAny() {
    this.getSystemMessage().then((data: any) => {
      let messages = data.content;

      _.each(messages, (message) => {
        this.systemToastMessageService.showMessage(message.description, message.title).then((toast: Toast) => {
          toast.data = {
            id: message.id
          };
        });
      });
    });
  }

  getList(params): Promise<IPaginatedResponse<IAlertMessage>> {
    return this.$http.get<IPaginatedResponse<IAlertMessage>>(this.baseUrl, {params}).then(result => result.data);
  }

  getUnread(params): Promise<IAlertMessage[]> {
    return this.$http.get<IAlertMessage[]>(`${this.baseUrl}/poll`, {params}).then(result => result.data);
  }

  markAsRead(id: number): Promise<any> {
    return this.$http.post(`${this.baseUrl}/${id}/ack`, {}).then(result => result.data);
  }

  createItem(item: IAlertMessage): Promise<IAlertMessage> {
    return this.$http.post<IAlertMessage>(this.baseUrl, item).then(result => result.data);
  }

  editItem(item: IAlertMessage): Promise<IAlertMessage> {
    return this.$http.post<IAlertMessage>(`${this.baseUrl}/${item.id}`, item).then(result => result.data);
  }

  deleteItem(item: IAlertMessage): Promise<any> {
    return this.$http.delete(`${this.baseUrl}/${item.id}`, {}).then(result => result.data);
  }

  private getSystemMessage() {
    let now = moment.utc().format('YYYY-MM-DDTHH:mm');
    return this.getUnread({filter_startDate_lt: now, filter_endDate_gt: now});
  }
}
