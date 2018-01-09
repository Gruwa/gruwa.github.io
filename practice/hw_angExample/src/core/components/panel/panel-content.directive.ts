export default (ngModule) => {
  ngModule.directive('cadPanelContent', [() => {
    let directive = {
      replace: true,
      require: '^cadPanel',
      template: require('./panel-content.html'),
      restrict: 'E',
      transclude: true,
      link: (scope, element, attrs, cadPanelCtrl, transclude) => {
        let trunscludeFn = _.once(() => {
          transclude(scope, (clone) => {
            element.append(clone);
          });
        });

        scope.$watch(() => cadPanelCtrl.getState(), (state) => {
          appendContent(state);
        });

        let isOpen = cadPanelCtrl.getState() || false;
        appendContent(isOpen);

        scope.$on('cad-panel:toggle', (event, args) => {
          appendContent(args.isOpen);
        });

        function appendContent(state) {
          if (state) trunscludeFn();
        }
      }
    };

    return directive;
  }]);
};
