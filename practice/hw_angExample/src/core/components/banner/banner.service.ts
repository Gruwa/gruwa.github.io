export class BannerService {
  private bannerMessage: string = null;
  constructor(
    private $rootScope: ng.IRootScopeService
  ) {
    'ngInject';

    this.$rootScope.$on('$stateChangeStart', () => {
      this.bannerMessage = null;
    });
  }

  getBannerMessage(): string {
    return this.bannerMessage;
  }

  warn(msg: string) {
    this.bannerMessage = msg;
  }
}
