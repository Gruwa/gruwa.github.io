import multiSelectionFilter from './multi-selection.filter';
import renderTplFilter from './render-tpl.filter';
import {CadPercent} from './percent.filter';
import {CadPercentage} from './percentage.filter';
import {cadLimitToFilter} from '../../ng2/common';
import {getNestedFilter} from '../../ng2/common';
import {itemLabelFilter} from '../../ng2/common';
import {highlightFilter} from '../../ng2/common';
import {cadUsernameFilter} from '../../ng2/common';

const ngModule = angular.module('cadreon.core.filters', []);

// TODO: delete next 2 filters when they are gone from Reporting app (the only using it)
multiSelectionFilter(ngModule);
renderTplFilter(ngModule);

ngModule.filter('cadPercent', CadPercent);
ngModule.filter('cadPercentage', CadPercentage);
ngModule.filter('cadLimitTo', () => cadLimitToFilter);
ngModule.filter('getNested', () => getNestedFilter);
ngModule.filter('itemLabel', () => itemLabelFilter);
ngModule.filter('highlight', () => highlightFilter);
ngModule.filter('cadUsername', () => cadUsernameFilter);

export default ngModule;
