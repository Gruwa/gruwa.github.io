import {ILocale, LocaleService} from '../../../services/locale/locale.service';
import {UsersService} from '../../../services/resources/users/users.service';
import {MessageService} from '../../../services/toast-messages/message.service';
import {CurrentUserService} from '../../services/current-user.service';

export class DefaultLocalePopupController {
  // used to prevent closing by other components
  OK = 'ok';

  constructor(
    public browserLocale: ILocale,
    private $scope: ng.IScope,
    private $translate: ng.translate.ITranslateService,
    private $uibModalInstance: cad.ICadModalServiceInstance,
    private currentUserService: CurrentUserService,
    private localeService: LocaleService,
    private usersService: UsersService,
    private messageService: MessageService
  ) {
    'ngInject';

    $scope.$on('modal.closing', ($event, param) => {
      if (param !== this.OK) {
        $event.preventDefault();
      }
    });
  }

  applyBrowserLocale() {
    this.updateUser(this.browserLocale)
      .then(() => {
        let message = this.$translate.instant('default_locale.update_success', {
          locale: this.browserLocale.title
        });
        this.messageService.showSuccessMessage(message);
      })
      .catch(() => {
        this.messageService.showErrorMessage('default_locale.update_error');
      });
  }

  applyDefaultLocale() {
    this.updateUser(this.localeService.getDefaultLocale());
  }

  close() {
    this.$uibModalInstance.dismiss(this.OK);
  }

  private updateUser(locale: ILocale): ng.IPromise<void> {
    this.$uibModalInstance.showSpinner = true;

    let customData = this.currentUserService.user.customData;
    _.set(customData, 'localization.locale', locale.id);

    return this.usersService.updateUser(this.currentUserService.name, {
      customData: angular.toJson(customData)
    }).then(() => {
      this.currentUserService.setCustomData(customData);
    }).then(() => {
      this.$uibModalInstance.close(this.OK);
    }).catch(() => {
      this.$uibModalInstance.dismiss(this.OK);
    }).finally(() => {
      this.$uibModalInstance.showSpinner = false;
    });

  }
}
