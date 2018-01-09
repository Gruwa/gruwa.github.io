export default modalDecorator;

/* @ngInject */
function modalDecorator($delegate) {
  let openOrigin = $delegate.open.bind($delegate);

  $delegate.open = decoratedOpen;

  return $delegate;

  function decoratedOpen(modalOptions) {
    let $uibModalInstance = openOrigin(modalOptions);
    $uibModalInstance.showSpinner = false; // TODO: fix, doesn't work
    return $uibModalInstance;
  }
}
