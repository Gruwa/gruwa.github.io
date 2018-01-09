export class AdBlockPopupController {
  ACQUAINTED = 'acquainted';

  constructor(
    $scope: ng.IScope,
    private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance
  ) {
    'ngInject';

    $scope.$on('modal.closing', ($event, param) => {
      if (param !== this.ACQUAINTED) {
        $event.preventDefault();
      }
    });
  }

  close() {
    this.$uibModalInstance.close(this.ACQUAINTED);
  }
}
