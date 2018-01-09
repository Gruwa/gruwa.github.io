interface IHttpErrorResponse {
  error: string;
  message: string;
  status: number;
}

export class HttpErrorHandler {
  constructor(
    private $state: ng.ui.IStateService,
    private $q: ng.IQService
  ) {
    'ngInject';
  }

  static registerStates($stateProvider: ng.ui.IStateProvider, parentState: string) {
    $stateProvider
      .state('404', {
        parent: parentState,
        template: require('../assets/http-errors/404.html')
      })
      .state('500', {
        parent: parentState,
        template: require('../assets/http-errors/500.html')
      })
      .state('403', {
        parent: parentState,
        template: require('../assets/http-errors/403.html')
      });
  }

  handle() {
    return (error: ng.IHttpPromiseCallbackArg<IHttpErrorResponse>) =>
      this.$q.reject(error)
       .catch(this.handle403())
       .catch(this.handle404())
       .catch(this.handle500());
  }

  handle404() {
    return ((error: ng.IHttpPromiseCallbackArg<IHttpErrorResponse>) => {
      if (error.status === 404) {
        this.$state.go('404', {}, {location: false});
      } else {
        return this.$q.reject(error);
      }
    });
  }

  handle500() {
    return ((error: ng.IHttpPromiseCallbackArg<IHttpErrorResponse>) => {
      if (error.status >= 500) {
        this.$state.go('500', {}, {location: false});
      } else {
        return this.$q.reject(error);
      }
    });
  }

  handle403() {
    return ((error: ng.IHttpPromiseCallbackArg<IHttpErrorResponse>) => {
      if (error.status === 403) {
        this.$state.go('403', {}, {location: false});
      } else {
        return this.$q.reject(error);
      }
    });
  }
}
