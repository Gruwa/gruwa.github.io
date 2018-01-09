import {rot13} from '../core/utils/rot13';

declare const ga: any;

((window: any) => {
  let cadreonConfig = window.cadreon || {};

  // decode config from cadreon.js
  if (typeof cadreonConfig === 'string') {
    try {
      cadreonConfig = window.JSON.parse(window.atob(rot13(cadreonConfig)));
    } catch (e) {
      cadreonConfig = {};
    }
  }

  // add AppDynamics tracker
  if (cadreonConfig['app-dynamics-rum-app-key']) {
    window['adrum-start-time'] = new Date().getTime();
    window['adrum-app-key'] = cadreonConfig['app-dynamics-rum-app-key'];
    addScript('https://cdn.appdynamics.com/adrum/adrum-4.1.8.5.js', false);
  }

  // add Google Tag Manager (code is copy-paste from https://developers.google.com/tag-manager/quickstart)
  if (cadreonConfig.googleTagManagerId) {
    (new Function(`
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${cadreonConfig.googleTagManagerId}');
    `))();
  }

  function addScript(url: string, async: boolean) {
    let script = window.document.createElement('script');
    script.src = url;
    script.async = async;
    window.document.head.appendChild(script);
  }
})(window);
