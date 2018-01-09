import {UploadController} from './upload.controller';

export default (ngModule) => {
  describe(ngModule.name, () => {
    describe('cadUpload controller', () => {
      let vm;
      let options;
      let $element;
      let $q;
      let $scope;
      let ngModel;

      beforeEach(() => {
        angular.mock.module(ngModule.name);
        angular.mock.inject(($controller, _$q_, $rootScope) => {
          options = {};
          ngModel = { $setViewValue: sinon.spy() };
          $element = { controller: sinon.stub().returns(ngModel) };
          $q = _$q_;
          $scope = $rootScope.$new(true);

          vm = $controller(
            UploadController,
            { $element: $element },
            { options: options }
          );
        });
      });

      it('should properly init', () => {
        expect(vm).to.not.be.undefined;
        expect($element.controller).calledWith('ngModel');
      });

      it('vm.textPath()', () => {
        options.titlesRoot = 'xxx';
        expect(vm.textPath('yyy')).to.equal('xxx.yyy');
      });

      it('vm.invokeUpload()', () => {
        let file = { name: 'some-file-name' };
        options.uploadFn = sinon.stub().returns($q.defer().promise);

        // shouldn't do anything when no file defined
        vm.invokeUpload();
        expect(options.uploadFn).not.calledOnce;

        // expect some actions when file object is present
        vm.invokeUpload(file);
        expect(vm.fileName).to.equal(file.name);
        expect(vm.activeState).to.equal('progress');
        expect(options.uploadFn).calledWith(file);
      });

      it('vm.resetState()', () => {
        vm.activeState = null;
        vm.fileName = null;
        vm.progressPosition = null;

        vm.resetState();

        expect(vm.activeState).to.equal('initial');
        expect(vm.fileName).to.equal('');
        expect(vm.progressPosition).to.equal(0);
        expect(ngModel.$setViewValue).calledWith(null);
      });

      describe('upload promise', () => {
        let defer;

        beforeEach(() => {
          let file = { name: 'some-file-name' };
          defer = $q.defer();
          options.uploadFn = () => defer.promise;
          vm.invokeUpload(file);
        });

        it('success', () => {
          defer.resolve();
          $scope.$digest();
          expect(vm.activeState).to.equal('success');
        });

        it('fail', () => {
          defer.reject();
          $scope.$digest();
          expect(vm.activeState).to.equal('error');
        });

        it('progress', () => {
          defer.notify({ total: 100, loaded: 5 });
          $scope.$digest();
          expect(vm.activeState).to.equal('progress');
          expect(vm.progressPosition).to.equal(5);

          // check progress position is between 0 and 100
          defer.notify({ total: 100, loaded: -5 });
          $scope.$digest();
          expect(vm.progressPosition).to.equal(0);

          defer.notify({ total: 100, loaded: 99999 });
          $scope.$digest();
          expect(vm.progressPosition).to.equal(100);
        });
      });

    });
  });
};
