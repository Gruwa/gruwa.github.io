export default (ngModule) => {
  ngModule.filter('xlinkhref', ['$sce', ($sce) => {
    return (xlinkhref) => {
      return $sce.trustAsResourceUrl('#icon-' + xlinkhref);
    };
  }]);
};
