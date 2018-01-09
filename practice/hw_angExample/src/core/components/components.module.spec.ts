import ngModule from './components.module';

import xlinkhrefFilter from './icon/xlinkhref.filter.spec';
import searchDirective from './search/search.directive.spec';
import smartSearchListController from './smart-search-list/smart-search-list.controller.spec';
import toggleDirective from './switches/toggle/toggle.directive.spec';
import iconDirective from './icon/icon.directive.spec';
import iconDynamicDirective from './icon-dynamic/icon-dynamic.directive.spec';
import numberDirective from './inputs/number/number.directive.spec';
import statusButtonDirective from './status/status-button.directive.spec';
import './common-list/common.list.controller.spec';
import uploadController from './upload/upload.controller.spec';
import trackFormChangesController from './track-unsaved/track-form-changes.controller.spec';
import './ui-grid-pager/ui-grid-pager.component.spec';
import './pagination/pagination.spec';
import './previous-state/previous-state.directive.spec';
import './banner/banner.component.spec';
import './banner/banner.service.spec';

xlinkhrefFilter(ngModule);
searchDirective(ngModule);
smartSearchListController(ngModule);
toggleDirective(ngModule);
iconDirective(ngModule);
iconDynamicDirective(ngModule);
numberDirective(ngModule);
statusButtonDirective(ngModule);
uploadController(ngModule);
trackFormChangesController(ngModule);

export default ngModule;
