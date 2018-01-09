import {BannerService} from './banner.service';

export class BannerController {
  constructor(
    private bannerService: BannerService
  ) {
    'ngInject';
  }

  getBannerMessage() {
    return this.bannerService.getBannerMessage();
  }

  isBannerShown() {
    return !_.isEmpty(this.bannerService.getBannerMessage());
  }
}

export const BannerComponent: ng.IComponentOptions = {
  template: require('./banner.html'),
  controller: <ng.IControllerConstructor> BannerController,
  controllerAs: 'vm'
};
