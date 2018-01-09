export class DefaultConfig {
  // auth keys will be filled from webpack's DefinePlugin for dev mode and from env's "cadreon.js" for prod
  key = AUTH.key;
  secret = AUTH.secret;
  baseURL = null;
  samlProxy = null; // used in DEV to proxy saml request to a server that has settings required to initiate sso
  notificenterURL = '';
  contextPath = {
    shell: 'shell/v1.0/api/',
    atv: 'atv/v1.0/api/',
    amp: 'apiamp/v1.0/api/',
    cm: 'cm/v1.0/api/',
    authmgmt: 'authmgmt/v1/',
    reports: 'reports/v1.0/api/',
    symphony: 'symphony/v1.0/api/',
    ttag: 'totaltag/v1/',
    // 'user: 'shell/v1.0/api/user/me',
    user: 'authmgmt/v1/',
    financedb: 'cfd/v1.0/api/',
    csf: 'csf/v1.0/api/',
    notificenter: 'notificenter/v1.0/api/',
    marketplace: 'marketplace/v1.0/',
    creatives: 'creatives/v1.0/api/',
    optimization: 'optimization/v1.0/',
    marketplace_analytics: 'valueplanner/v1.0/',
    recommendations: 're/api/v1.0/'
  };
  emailForSupportRequests = 'support@cadreon.com';
  contextPathUI = '/'; // allows run Unity from any sub-dir on server, by default it should run from www root
  passwordRegexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(.{8,30})$/;
  devDefaultUrl = '';
  mobileAppUrl = ''; // to be filled from cadreon.js env config
  reportFiltersApi = 'reports'; // contextPath: reports, cm
  importPollingInterval = 1000;
  defaultRedirectInterval = 3000;
  defaultModelOptions = { updateOn: 'default', debounce: 0 };
  checkAdBlock = true;
  websocket = { totalTag: 'ws://ec2-52-7-96-231.compute-1.amazonaws.com:8000/ttag-api-server/websocket' };
  googleTagManagerId = ''; // production code: GTM-52T6W87, empty means disabled
  documentationLinks = {
    wiki: 'https://wiki.mbww.com/display/PRODUCT/Cadreon+Unity+User+Guide',
    pdf: 'https://s3.amazonaws.com/cadreon-unity/public/Cadreon_Unity_User_Guide.pdf'
  };
  reportingUrls = {
    tableau: 'https://tabaws.mbww.com/t/Cadreon/views/#path#',
    datorama: 'https://app.datorama.com/index.html#/page/dashboardpage/show?embedpage=#path#'
  };
  ssoEnabled = false;
}
