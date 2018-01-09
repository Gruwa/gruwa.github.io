import {CurrentUserService} from '../../auth';

interface ISelect4Scope extends ng.IScope {
  options: any;
}

export class Select4Controller {
  'ngInject';

  private element: any = null;
  private defaultOptions = {};

  constructor(
    private $scope: ISelect4Scope,
    private $translate: ng.translate.ITranslateService,
    private currentUserService: CurrentUserService
  ) {
    'ngInject';
  }

  get options() {
    const language = require('select2/src/js/select2/i18n/' + this.currentUserService.language.select2);

    return angular.extend(
      {
        language: angular.extend(
                    language,
                    { noResults: (term) => this.$translate.instant('global.no_matches_found') }
                  )
      },
      this.defaultOptions,
      this.$scope.options
    );
  }

  setElement(element) {
    this.element = element;
  }

  getElement() {
    return this.element;
  }
}
