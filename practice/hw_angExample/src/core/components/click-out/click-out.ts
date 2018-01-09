interface ICadClickOutAttributes extends ng.IAttributes {
  cadClickOut: string;
  closeOnEsc?: string;
  visibilityAction?: string;
  visibleClass?: string;
}

const KEYCODE_ESC = 27;
const DEFAULT_VISIBLE_CLASS = 'is-open';

export function cadClickOutDirective($document: ng.IDocumentService): ng.IDirective {
  'ngInject';

  return {
    restrict: 'A',
    link: (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ICadClickOutAttributes) => {
      let closeExpression = attrs.cadClickOut;
      let closeOnEsc: boolean = scope.$eval(attrs.closeOnEsc || 'false');
      let closeOnInsideClick: boolean = scope.$eval(attrs.visibilityAction || 'true');
      let visibleClass: string = attrs.visibleClass || DEFAULT_VISIBLE_CLASS;
      let preventClose = false;

      // set event listeners
      $document[0].addEventListener('click', _doClose);
      if (!closeOnInsideClick) { element[0].addEventListener('click', _elementClick); }
      if (closeOnEsc) { $document[0].addEventListener('keyup', _checkKey); }

      // free event listeners; remover works fine even for not registered listeners, so no need in checks
      element.on('$destroy', () => {
        $document[0].removeEventListener('click', _doClose);
        $document[0].removeEventListener('keyup', _checkKey);
        element[0].removeEventListener('click', _elementClick);
      });

      function _elementClick() {
        preventClose = !closeOnInsideClick;
      }

      function _doClose() {
        let isElementVisible = element[0].classList.contains(visibleClass); // ~3 times faster than "hasClass()"
        if (!preventClose && isElementVisible) {
          scope.$apply(closeExpression);
        }
        preventClose = false;
      }

      function _checkKey(event) {
        if (event.keyCode === KEYCODE_ESC) { _doClose(); }
      }
    }
  };
}
