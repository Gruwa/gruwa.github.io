angular.module('app').directive('closeEditing', function () {
    const KEYS = {
        ESCAPE: 27
    };
    return {
        scope: {
            isEditing: '='
        },
        link: function (scope, element, attrs) {
            console.log('closeEditing', scope.isEditing);

            element.on('keyup', function (e) {
                if (_.isEqual(e.keyCode, KEYS.ESCAPE)) {
                    scope.isEditing = false;
                    scope.$apply();
                }
            });
        }
    };
});
