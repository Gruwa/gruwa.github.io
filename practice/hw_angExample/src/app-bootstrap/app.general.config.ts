import * as moment from 'moment';

export function appGeneralConfig(
  $httpProvider: ng.IHttpProvider,
  $translateProvider: ng.translate.ITranslateProvider,
  $uibModalProvider: ng.ui.bootstrap.IModalProvider,
  $compileProvider: ng.ICompileProvider,
  $uiViewScrollProvider: ng.ui.IUiViewScrollProvider,
  $uibTooltipProvider: ng.ui.bootstrap.ITooltipProvider
) {
  'ngInject';

  $translateProvider.useSanitizeValueStrategy('sanitizeParameters');
  // Set EN as default language. Language could be overridden on user profile
  $translateProvider.preferredLanguage('en-us');
  // Fallback to English if translation ID is not found in active language
  $translateProvider.fallbackLanguage('en-us');

  moment.locale('en');

  $uibModalProvider.options.backdrop = 'static';
  $uibModalProvider.options.windowTemplateUrl = 'modal-dialog-template';

  $uibTooltipProvider.options({
    placement: 'bottom',
    appendToBody: true
  });

  $uiViewScrollProvider.useAnchorScroll();

  if (ENVIRONMENT === 'production') {
    $compileProvider.debugInfoEnabled(false);
  }

  $httpProvider.interceptors.push('urlInterceptor');
  $httpProvider.interceptors.push('authInterceptor');

  // combine processing of multiple http responses received at around the same time into next digest tick
  $httpProvider.useApplyAsync(true);
}
