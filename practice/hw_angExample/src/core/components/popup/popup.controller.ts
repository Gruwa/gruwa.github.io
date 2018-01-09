type PopupResolveValue = any;
type ModalResolveValue = () => PopupResolveValue;

interface IPopupResolve {
  [arg: string]: PopupResolveValue;
}

interface IModalResolve {
  [arg: string]: ModalResolveValue;
}

export class PopupController {
  component: string;
  resolve: IPopupResolve;
  onClose: (arg: {result: any}) => void;
  size: string;
  disabled: boolean;

  constructor(
    private $uibModal: ng.ui.bootstrap.IModalService
  ) {
    'ngInject';
  }

  open($event: ng.IAngularEvent): void {
    $event.stopPropagation();

    if (this.disabled) {
      return;
    }

    this.$uibModal
      .open({
        component: this.component,
        size: this.size,
        resolve: this.createModalResolve()
      })
      .result.then(result => {
        this.onClose({ result });
      });
  }

  private createModalResolve(): IModalResolve {
    return _.mapValues<PopupResolveValue, ModalResolveValue>(this.resolve, argValue => {
      return () => argValue;
    });
  }
}
