import {AdBlockPopupController} from './ad-block-warning-popup.controller';
import {ConfigService} from '../config/config.service';

export class AdBlockService {
  private modal: ng.ui.bootstrap.IModalServiceInstance;

  constructor(private $window: cad.IWindowService,
              private $uibModal: ng.ui.bootstrap.IModalService,
              private configService: ConfigService) {
    'ngInject';
  }

  checkAdBlock() {
    if (this.configService.checkAdBlock) {
      this.$window.blockAdBlock.on(true, this.displayInfo.bind(this));
    }
  }

  private displayInfo() {
    this.modal = this.$uibModal.open({
      size: 'sm-440',
      template: require('./ad-block-warning-popup.html'),
      controller: AdBlockPopupController,
      controllerAs: 'vm'
    });
  }
}
