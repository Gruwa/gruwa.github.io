export interface IPromiseEvent extends ng.IAngularEvent {
  promise: ng.IPromise<void>;
}

class InformerTooltipController implements ng.IController {
  isVisible = false;
  eventName: string;
  informerText: string;
  private defer: ng.IDeferred<void>;

  constructor(
    private $q: ng.IQService,
    private $scope: ng.IScope
  ) {
    'ngInject';
  }

  $onInit() {
    this.$scope.$on(this.eventName, (event: IPromiseEvent, text: string) => {
      this.isVisible = true;
      this.informerText = text;

      // add promise to event object to notify event sender about closing this informer
      this.defer = this.$q.defer<void>();
      event.promise = this.defer.promise;
    });
  }

  close() {
    this.isVisible = false;
    this.defer.resolve();
  }
}

export const InformerTooltipComponent: ng.IComponentOptions = {
  template: require('./informer.html'),
  controller: InformerTooltipController,
  controllerAs: 'vm',
  bindings: {
    eventName: '@showOnEvent',
    position: '@'
  }
};
