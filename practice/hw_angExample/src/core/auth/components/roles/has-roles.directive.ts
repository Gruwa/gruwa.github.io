import {CurrentUserService} from '../../services/current-user.service';

export default (ngModule) => {
  /*@ngInject*/
  function CadHasRoles(currentUserService: CurrentUserService) {
    let directive = {
      restrict: 'A',
      terminal: true,
      link: _linkFn
    };

    function _linkFn($scope, $element, $attr) {
      let roles = $scope.$eval($attr.cadHasRoles);

      if (roles && !currentUserService.hasPermissions(roles)) {
        $element.remove();
      }
    }
    return directive;
  }

  ngModule.directive('cadHasRoles', CadHasRoles);
};
