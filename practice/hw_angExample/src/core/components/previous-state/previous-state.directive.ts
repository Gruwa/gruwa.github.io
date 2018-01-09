interface ICadPreviousStateAttributes extends ng.IAttributes {
  uiSref?: string;
}
interface ICadPreviousStateScope extends ng.IScope {
  cadPreviousState: string | string[];
}

export function cadPreviousStateDirective($previousState) {
  'ngInject';

  function _goBack(e) {
    e.preventDefault();
    $previousState.go();
  }

  return {
    restrict: 'A',
    scope: {
      cadPreviousState: '=?'
    },
    link: (scope: ICadPreviousStateScope, element: ng.IAugmentedJQuery, attrs: ICadPreviousStateAttributes) => {
      let memoState = scope.cadPreviousState || attrs.uiSref;
      if (!_.isArray(memoState)) {
        memoState = [memoState];
      }
      let previousState = $previousState.get();
      if (_.get(previousState, 'state.name') && _.includes(memoState, previousState.state.name)) {
        element.on('click', _goBack);
      }
      scope.$on('$destroy', () => {
        element.off('click', _goBack);
      });
    }
  };

}
