import * as _ from 'lodash';
import {Injectable, Inject} from '@angular/core';
import {UsersService} from '../../core/services/resources/users/users.service';
import {CurrentUserService} from '../../core/auth/services/current-user.service';
import {WindowService, ConfigService} from '../common';
import {IUploadPromise} from '../upload';

export interface ISupportRequestData {
  subject: string;
  description: string;
  screenshotUrl: string;
  systemInfo: string;
  roles: string[];
  customData: string;
}

@Injectable()
export class SupportService {
  private popup: ng.ui.bootstrap.IModalServiceInstance;

  constructor(
    @Inject(WindowService) private $window: cad.IWindowService,
    @Inject('$http') private $http: ng.IHttpService,
    @Inject('$uibModal') private $uibModal: ng.ui.bootstrap.IModalService,
    @Inject('Upload') private Upload: ng.angularFileUpload.IUploadService,
    @Inject('usersService') private usersService: UsersService,
    @Inject('currentUserService') private currentUserService: CurrentUserService,
    private configService: ConfigService
  ) {}

  openPopup() {
    this.popup = this.$uibModal.open({
      size: 'md-600',
      component: 'cadNgxSupportPopup'
    });
  }

  closePopup() {
    this.popup.close();
    this.popup = null;
  }

  isPopupOpened(): boolean {
    return !_.isNil(this.popup);
  }

  sendRequest(data: ISupportRequestData): Promise<{}> {
    let endpoint = this.configService.getShellBaseURL() + 'support/request';
    return this.$http.post(endpoint, data);
  }

  sendSessionRequest(subject: string, description: string, screenshotUrl: string): Promise<{}> {
    return this.usersService.getUser(this.currentUserService.name).then(user => {
      return this.sendRequest({
        subject,
        description,
        screenshotUrl,
        systemInfo: this.getSystemInfo(),
        roles: user.roles,
        customData: JSON.stringify(user.customData)
      });
    });
  }

  uploadAttach(file: {type: string}): IUploadPromise<string> { // tslint:disable-line
    let endpoint = this.configService.getShellBaseURL() + 'file/urls';
    let config = { cache: false, params: { type: file.type } };

    // get s3 upload/download links from our backend and then run upload routine
    let finalResult = <IUploadPromise<string>> this.$http.get<any>(endpoint, config)
      .then(resp => {
        let upload = this.Upload.http(<ng.IRequestConfig> {
          url: resp.data.put,
          method: 'PUT',
          headers: {
            'Content-Type': file.type
          },
          suppressAuthorization: true, // flag for http interceptor to don't add bearer token as amazon fails with it
          data: file
        });

        // originally upload service returns abort() method but it's not transferred further on chaining promises
        // so need to add it manually to the final promise to allow cancel upload process from ui directive
        finalResult.abort = upload.abort;

        return upload.then(() => {
          // on successful upload return file's download link
          return resp.data.get;
        });
      });

    return finalResult;
  }

  // return short information about system
  private getSystemInfo(): string {
    let params = [];
    params.push(this.$window.navigator.userAgent);
    params.push('screen resolution ' + this.$window.screen.width + 'x' + this.$window.screen.height);
    return params.join(', ');
  }
}
