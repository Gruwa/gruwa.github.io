import ngModule from './filters.module';

import renderTplFilterSpec from './render-tpl.filter.spec';
import percentFilterSpec from './percent.filter.spec';
import percentageFilterSpec from './percentage.filter.spec';

renderTplFilterSpec(ngModule);
percentFilterSpec(ngModule);
percentageFilterSpec(ngModule);

export default ngModule;
