import {ComponentFactoryResolver, Injectable, NgZone, ApplicationRef, Inject} from '@angular/core';
import {ToastsManager, ToastOptions, Toast} from 'ng2-toastr';

type MessageType = 'error' | 'info' | 'success' | 'warning' | 'custom';

export interface IToastMessageOptions {
  body: string;
  title?: string;
  bodyTranslateParams?: {
    [prop: string]: string;
  };
  titleTranslateParams?: {
    [prop: string]: string;
  };

  // Native params that could be overridden from ToastOptions
  isWhite?: boolean;
  dismiss?: string;
  toastLife?: number;
  enableHTML?: boolean;
  titleClass?: string;
  messageClass?: string;
  data?: Object;
}

const DEFAULT_PARAMS = {
  toastLife: 3000
};

@Injectable()
export class MessageService extends ToastsManager {
  private $translate: ng.translate.ITranslateService;

  constructor(
    componentFactoryResolver: ComponentFactoryResolver,
    ngZone: NgZone,
    applicationRef: ApplicationRef,
    @Inject('$translate') $translate: ng.translate.ITranslateService
  ) {
    let toastOptions = new ToastOptions();
    toastOptions.positionClass = 'toast-top-center';
    toastOptions.newestOnTop = false;

    super(componentFactoryResolver, ngZone, applicationRef, toastOptions);

    this.$translate = $translate;
  }

  showErrorMessage(message: string | IToastMessageOptions): Promise<Toast> {
    let params: IToastMessageOptions = _.isString(message) ? {body: message} : message;
    params = {
      ...DEFAULT_PARAMS,
      ...params
    };
    return this.showMessage('error', params);
  }

  showSuccessMessage(message: string | IToastMessageOptions): Promise<Toast> {
    let params: IToastMessageOptions = _.isString(message) ? {body: message} : message;
    params = {
      ...DEFAULT_PARAMS,
      ...params
    };
    return this.showMessage('success', params);
  }

  showProgressMessage(message: string | IToastMessageOptions): Promise<Toast> {
    let params: IToastMessageOptions = _.isString(message) ? {body: message} : message;
    params = {
      ...DEFAULT_PARAMS,
      ...params
    };
    return this.showMessage('info', params);
  }

  private showMessage(messageType: MessageType, options: IToastMessageOptions): Promise<Toast> {
    let message = this.$translate.instant(options.body, options.bodyTranslateParams);
    let title = this.$translate.instant(options.title, options.titleTranslateParams);

    if (options.isWhite) {
      messageType += ' toast-white';
    }

    const toast = new Toast(messageType, message, title, _.get(options, 'data', null));
    return this.show(toast, options);
  }

}
