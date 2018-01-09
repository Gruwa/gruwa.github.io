export default (ngModule) => {
  ngModule.filter('renderTpl', [() => {
    return (item, label) => {
      if (item) {
        if (label) {
          let compiled = _.template(label);
          return compiled({ data: item });
        }
      }
    };
  }]);
};
