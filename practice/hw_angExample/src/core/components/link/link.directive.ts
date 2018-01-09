export default (ngModule) => {
  ngModule.directive('cadLink', ['$translate', ($translate) => {
  let directive = {
    replace: true,
    template: require('./link.html'),
    restrict: 'E',
    transclude: true,
    compile: (element, attrs, transclude) => {
      element.addClass(attrs.type);

      if (attrs.icon) {
        element.prepend('<cad-icon name="' + attrs.icon + '"></cad-icon>');
      }

      if (attrs.disabled) {
        element.addClass('disabled');
      }

      return {
        pre: (scope2, element2, attrs2) => {
          if (attrs2.value) {
            $translate(attrs2.value)
              .then(appendValue)
              .catch(() => appendValue(attrs2.value));
          } else {
            return (scope3) => {
              transclude(scope3, (clone) => {
                appendValue(clone.html());
              });
            };
          }

          function appendValue(value) {
            if (attrs2.iconRight === 'true') {
              element2.prepend('<span>' + value + '</span>');
            } else {
              element2.append('<span>' + value + '</span>');
            }
            if (!attrs2.noTitle) { element2.attr('title', value); }
          }
        }
      };
    }
  };

  return directive;
  }]);
};
