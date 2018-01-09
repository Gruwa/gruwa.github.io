export default modalStackDecorator;

/* @ngInject */
function modalStackDecorator($delegate) {
  let openOrigin = $delegate.open.bind($delegate);

  $delegate.open = decoratedOpen;

  return $delegate;

  function decoratedOpen(modalInstance, modal) {
    modal.scope.$uibModalInstance = modalInstance;
    return openOrigin(modalInstance, modal);
  }
}
