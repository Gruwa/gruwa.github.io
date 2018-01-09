export default (ngModule) => {
  ngModule.filter('multiSelection', [() => {
    return (selection, totalLength) => {
      let title = '';

      if (selection.length === 1) {
        title = selection[0].name;
      } else {
        title = selection.length + ' / ' + totalLength;
      }
      return title;
    };
  }]);
};
