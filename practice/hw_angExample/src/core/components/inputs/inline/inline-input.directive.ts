export default (ngModule) => {
  function CadInlineInput($document, $rootScope, $q) {
    return {
      link,
      transclude: true,
      template: require('./inline-input.html'),
      restrict: 'E',
      scope: {
        label: '@',
        size: '@',
        theme: '@?', // currently, only 'white' theme is implemented, except default view
        viewValue: '@',
        onSave: '&', // can return promise for handling BE validation
        onSaveErrorMessage: '@',
        editable: '=',
        placeholderValue: '@',
        tooltipAfterSymbols: '=',
        tooltipPlacement: '@',
        isOnFocusMode: '@?',
        inlineForm: '=?', // link to fab form data in order to control custom error messages
        customClass: '@'
      }
    };

    function link($scope, element, attrs) {
      let $rootEl = angular.element(element[0].querySelector('.cad-input-data'));
      let $input = angular.element(element[0].querySelector('.cad-edit__input input'));
      let $label = angular.element(element[0].querySelector('.cad-input-data__label'));
      let initValue;
      let removeOnActiveListener;

      $scope.save = save;
      $scope.close = close;
      $scope.switchToEditState = switchToEditState;
      $scope.switchToViewState = switchToViewState;
      $scope.onSaveError = false;

      activate();

      function activate() {
        $scope.onSaveError = false;
        $scope.tooltipPlacement = $scope.tooltipPlacement || 'bottom';
        $scope.size = $scope.size || 'small';
        element.find('.cad-edit__action, input').on('click', (e) => {
          e.stopPropagation();
        });
        $scope.fabFormOptions = $scope.$eval(attrs.fabFormOptions);
        $scope.inlineForm = $scope.editForm;
      }

      function switchToEditState() {
        $scope.onSaveError = false;
        $rootEl.addClass('is-active');
        if ($input.attr('required')) {
          $label.addClass('required');
        }

        let needToUpdateModel = $input.val() === '';
        if ($input.val() !== $scope.viewValue) {
          $input.val($scope.viewValue);
          if (needToUpdateModel) {
            $input.trigger('change');  // needed to update to link with passed model
          }
        }
        $input.focus();
        initValue = $input.val();
        $document.on('click', save);  // outside click
        $document.on('keyup', switchStateByKey);  // handle Enter and Esc keys

        /**
         * trying to save and close previously opened inline input
         * @see https://cadreon.atlassian.net/browse/UTAG-2085
         */
        removeOnActiveListener = $scope.$on('cad-inline-input:active', (event, params) => {
          if (params.element !== element) {
            save();
          }
        });
        $rootScope.$broadcast('cad-inline-input:active', {element});
      }

      function switchToViewState() {
        $scope.$applyAsync(() => {
          $label.removeClass('required');
          $rootEl.removeClass('is-active');
        });

        $document.off('click', save);
        $document.off('keyup', switchStateByKey);

        if (_.isFunction(removeOnActiveListener)) {
          removeOnActiveListener();
        }
      }

      function save() {
        $scope.onSaveError = false;
        // to prevent saving of whitespaces in the input field
        $input.val($input.val().trim());

        if ($scope.editForm && $scope.editForm.$invalid) {
          return;
        }

        $q.when($scope.onSave()) // onSave not always return promise, it prevents failures in this cases
          .then(data => {
            $scope.switchToViewState();
          })
          .catch(error => {
            $scope.onSaveError = true;
          });
      }

      function close() {
        $scope.viewValue = initValue;
        $input.val(initValue);
        $input.trigger('change'); // needed to trigger fabForm validation
        $scope.switchToViewState();
      }

      function switchStateByKey(e) {
        if (e.keyCode === 13) {
          save();
        }
        if (e.keyCode === 27) {
          close();
        }
      }
    }
  }

  ngModule
    .directive('cadInlineInput', CadInlineInput);
};
