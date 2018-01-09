import {ApplicationRef, ComponentFactoryResolver, Inject, Injectable, NgZone} from '@angular/core';
import {ToastsManager, ToastOptions, Toast} from 'ng2-toastr';

@Injectable()
export class SystemToastMessageService extends ToastsManager {
  private closeActions: ((toast: Toast) => void)[];
  private closeFn: Function;
  private $translate: ng.translate.ITranslateService;

  constructor(
    componentFactoryResolver: ComponentFactoryResolver,
    ngZone: NgZone,
    applicationRef: ApplicationRef,
    @Inject('$translate') $translate: ng.translate.ITranslateService
  ) {
    let toastOptions = new ToastOptions();
    toastOptions.positionClass = 'toast-bottom-center';
    toastOptions.newestOnTop = false;

    super(componentFactoryResolver, ngZone, applicationRef, toastOptions);

    this.$translate = $translate;
    this.closeActions = [];
  }

  showMessage(message: string, title: string): Promise<Toast> {
    const options = {
      showCloseButton: true,
      dismiss: 'controlled'
    };

    return this.custom(message, title, options).then((toast: Toast) => {
      // Need to handle close message action in order to make some additional actions
      if (!this.closeFnPatched()) {
        this.patchCloseFn();
      }
      return toast;
    });
  }

  /**
   * Added new callback function
   *
   * @param newCloseFn
   */
  onCloseClick(newCloseFn: (toast: Toast) => void) {
    this.closeActions.push(newCloseFn);
  }

  /**
   * Clear all list of callback functions.
   */
  clearCloseClickActions() {
    this.closeActions = [];
  }

  /**
   * Substitute original removeToast function with own, that call all closeActions() before original call
   */
  private patchCloseFn() {
    let originalCloseFn = this.container.instance.removeToast;

    this.closeFn = (toast: Toast) => {
      this.closeActions.forEach(fn => {
        fn(toast);
      });

      originalCloseFn.call(this.container.instance, toast);
    };

    this.container.instance.removeToast = this.closeFn;
  }

  /**
   * Checks if removeToast of container is already substituted with own function
   *
   * @returns {boolean}
   */
  private closeFnPatched(): boolean {
    return this.container.instance.removeToast === this.closeFn;
  }

}
