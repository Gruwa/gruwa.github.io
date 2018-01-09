import './resources/resources.module.spec';
import ngModule from './services.module';

import adBlockServiceSpec from './ad-block/ad-block.service.spec';
import localeServiceSpec from './locale/locale.service.spec';
import urlParamsBrokerServiceSpec from './url-params-broker/url-params-broker.service.spec';
import insightsServiceSpec from './insights/insights.service.spec';
import './locale/translations.spec';

adBlockServiceSpec(ngModule);
urlParamsBrokerServiceSpec(ngModule);
localeServiceSpec(ngModule);
insightsServiceSpec(ngModule);

export default ngModule;
