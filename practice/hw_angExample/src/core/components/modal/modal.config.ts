import modalDecorator from './modal-decorators/modal.decorator';
import modalStackDecorator from './modal-decorators/modal-stack.decorator';

export default (ngModule) => {
  ngModule.config(modalConfig);

  /* @ngInject */
  function modalConfig($provide) {
    $provide.decorator('$uibModal', modalDecorator);
    $provide.decorator('$uibModalStack', modalStackDecorator);
  }
};
