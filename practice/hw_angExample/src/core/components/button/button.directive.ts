export default (ngModule) => {
  ngModule.directive('cadButton', ['$translate', ($translate) => {
    let directive = {
      replace: true,
      template: require('./button.html'),
      restrict: 'E',
      transclude: true,
      compile: (element, attrs, transclude) => {
        element.addClass(attrs.view).addClass(attrs.size);

        if (attrs.icon) {
          element.prepend('<cad-icon name="' + attrs.icon + '"></cad-icon>');
          element.addClass('button_with-icon');
        }

        return {
          pre: (scope, element2, attrs2) => {
            if (attrs2.text) {
              $translate(attrs2.text).then(
                (value) => {
                  element2.append('<span>' + value + '</span>');
                },
                () => {
                  element2.append('<span>' + attrs2.text + '</span>');
                });
            } else {
              transclude(scope, (clone) => {
                element2.append(clone);
              });
            }
          }
        };
      }
    };

    return directive;
  }]);
};
