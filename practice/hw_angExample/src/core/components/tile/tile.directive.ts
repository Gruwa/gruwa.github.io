export default (ngModule) => {
  ngModule.directive('cadTile', [() => {
    let directive = {
      replace: true,
      template: require('./tile.html'),
      restrict: 'E',
      scope: true,
      transclude: true,
      link: (scope, element, attrs) => {
        scope.tileStyle = {
          width: attrs.width,
          height: attrs.height
        };

        if (!_.isUndefined(attrs.sideSpace)) {
          let calcSideSpace = attrs.sideSpace === 'auto' ? 'auto' : attrs.sideSpace + 'px';
          scope.tileStyle.marginLeft = calcSideSpace;
          scope.tileStyle.marginRight = calcSideSpace;
        }

        if (!_.isUndefined(attrs.bottomSpace)) {
          scope.tileStyle.marginBottom = attrs.bottomSpace + 'px';
        }

        if (attrs.footer) {
          /* footer: 'no', 'small', 'small_one_cell' */
          element.addClass('item_' + attrs.footer + '_foot');
        }

        if (attrs.color) {
          element.addClass(attrs.color);
        }
      }
    };

    return directive;
  }]);
};
