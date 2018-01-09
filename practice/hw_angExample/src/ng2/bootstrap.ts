// ng2 stuff
import {enableProdMode} from '@angular/core';
import {UpgradeModule} from '@angular/upgrade/static';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

export function bootstrapApp(ng2AppModule) {
  if (ENVIRONMENT === 'production') {
    enableProdMode();
  }

  // function ng1bootstrap() {
  //   angular.bootstrap(document.body, ['cadreon'], {strictDi: true});
  // }

  // bootstrap hybrid app able to run at the same time both ng1 and ng2
  function ng2bootstrap() {
    platformBrowserDynamic().bootstrapModule(ng2AppModule).then(platformRef => {
      const element = angular.element(window.document)[0];
      const upgrade = <UpgradeModule> platformRef.injector.get(UpgradeModule);
      upgrade.bootstrap(element, ['cadreon'], {strictDi: true});
    });
  }

  // need to bootstrap at the right time
  if (document.readyState === 'complete') {
    ng2bootstrap();
  } else {
    document.addEventListener('DOMContentLoaded', ng2bootstrap);
  }
}
