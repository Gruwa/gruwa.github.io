export default ngModule => {
  ngModule.directive('required', () => ({
    restrict: 'A',
    compile: (element, attr) => {
      if (attr.placeholder) {
        if (attr.class && attr.class.split(' ').includes('required')) {
          attr.placeholder += '*';
        }
      }
    }
  }));
};
