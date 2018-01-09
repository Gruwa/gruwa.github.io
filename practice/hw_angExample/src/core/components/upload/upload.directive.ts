import {UploadController} from './upload.controller';

export default (ngModule) => {
  function cadUploadDirective() {
    return {
      restrict: 'E',
      template: require('./upload.html'),
      scope: {},
      bindToController: {
        options: '=',
        uploadEvent: '&'
      },
      controller: UploadController,
      controllerAs: 'vm'
    };
  }

  ngModule.directive('cadUpload', cadUploadDirective);
};
