interface IStickyHeaderAttributes extends ng.IAttributes {
  startHeight?: number;
  endHeight?: number;
  stickyFrom?: number;
}

export function cadStickyHeader(
  $window: ng.IWindowService,
  $document: ng.IDocumentService,
  $timeout: ng.ITimeoutService
): ng.IDirective {
  'ngInject';
  return {
    restrict: 'A',
    scope: true,
    link: (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: IStickyHeaderAttributes) => {
      $timeout(() => {
        element.addClass('sticky-on-scroll');
        const headerButtons = [].slice.call(element[0].querySelectorAll('.button'));

        const DEFAULT_HEADER_HEIGHT = 62;
        let document: any = $document.get(0);

        let stickyMode = false;

        let options = {
          startHeight: attrs.startHeight || element[0].offsetHeight,
          endHeight: attrs.endHeight || DEFAULT_HEADER_HEIGHT,
          stickyFrom: attrs.stickyFrom || 0
        };

        angular.element($window).bind('scroll', () => {
          if ($window.pageYOffset > options.stickyFrom &&
              // Do not transform to sticky if there is no enough space. Prevent trembling
             (document.documentElement.scrollHeight - document.documentElement.clientHeight) > options.startHeight &&
              !stickyMode) {
            // Adding spacer element to compensate sticky head appearance
            let spacer = angular.element('<div>');
            spacer.addClass('cad-sticky-header-spacer');
            spacer.css('height', options.endHeight);
            element.parent().prepend(spacer);

            element.css('height', options.endHeight);
            element.addClass('sticky-animate');
            stickyMode = true;

            // change header buttons appearance when sticky mode is on
            headerButtons.forEach(btn => {
              if (btn.classList.contains('back')) {
                btn.classList.add('back-orange'); // "back" button should be transformed to "orange"
              } else {
                btn.classList.add('small'); // other buttons - just smaller
              }
            });
          }

          if ($window.pageYOffset <= options.stickyFrom && stickyMode) {
            element.parent().find('.cad-sticky-header-spacer').remove();
            element.css('height', options.startHeight);
            element.removeClass('sticky-animate');
            stickyMode = false;

            // reset header buttons appearance when sticky mode is off
            headerButtons.forEach(btn => {
              btn.classList.remove('back-orange');
              btn.classList.remove('small');
            });
          }
        });
      });
    }
  };
}
