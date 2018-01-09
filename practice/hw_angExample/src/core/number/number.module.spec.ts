import ngModule from './number.module';

import numberFilterSpec from './filters/number.filter.spec';
import numberShortFilterSpec from './filters/number-short.filter.spec';

numberFilterSpec(ngModule);
numberShortFilterSpec(ngModule);

export default ngModule;
