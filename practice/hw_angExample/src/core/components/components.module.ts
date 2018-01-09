import {downgradeComponent} from '@angular/upgrade/static';

import servicesModule from '../services/services.module';
import filtersModule from '../filters/filters.module';
import authModule from '../auth/';
import currencyModule from '../currency';

import modalConfig from './modal/modal.config';
import modalSpinnerDirective from './modal/modal-spinner/modal-spinner.directive';
import subheaderDirective from './subheader/subheader.directive';
import buttonDirective from './button/button.directive';
import inputProfileDirective from './inputs/profile/input-profile.directive';
import {CadNumberDirective} from './inputs/number/number.directive';
import inlineInputDirective from './inputs/inline/inline-input.directive';
import searchDirective from './search/search.directive';
import searchListDirective from './search-list/search-list.directive';
import itemsSelectorDirective from './items-selector/items-selector.directive';
import iconDirective from './icon/icon.directive';
import iconDynamicDirective from './icon-dynamic/icon-dynamic.directive';
import paginationDirective from './pagination/pagination.directive';
import linkActionDirective from './link/link-action/link-action.directive';
import linkDirective from './link/link.directive';
import stickyDirective from './sticky/sticky.directive';
import {cadClickOutDirective} from './click-out/click-out';
import CadDateTimePickerDirective from './datetimepicker/datetimepicker.directive';
import {dateTimeValidationDirectiveFactory,
        validateAfterFn, validateAfterOrEqualFn,
        validateBeforeFn, validateBeforeOrEqualFn} from './datetimepicker/date-time-validation';
import {cadValidatePeriodDays} from './datetimepicker/validate-period-days.directive';
import {CadDropdownDirective} from './dropdown/dropdown.directive';
import selectDirective from './select/select-container/select.directive';
import selectItemDirective from './select/select-item/select-item.directive';
import tabsDirective from './tabs/tabs-container/tabs.directive';
import tabsItemDirective from './tabs/tabs-item/tabs-item.directive';
import chipDirective from './chip/chip.directive';
import tileDirective from './tile/tile.directive';
import {CadTileIcon} from './tile-icon/tile-icon.directive';
import statusDirective from './status/status.directive';
import statusButtonDirective from './status/status-button.directive';
import switchesDirective from './switches/switches.directive';
import switchBtnDirective from './switches/button/switch-btn.directive';
import switchRadioDirective from './switches/radio/switch-radio.directive';
import switchCheckboxDirective from './switches/checkbox/switch-checkbox.directive';
import toggleDirective from './switches/toggle/toggle.directive';
import tagsDirective from './tags/tags.directive';
import columnDirective from './column/column.directive';
import panelDirective from './panel/panel.directive';
import panelHeadDirective from './panel/panel-head.directive';
import panelContentDirective from './panel/panel-content.directive';
import smartSearchListDirective from './smart-search-list/smart-search-list.directive';
import smartTooltipEnableDirective from './tooltip/smart-tooltip-enable.directive';
// no need to have xlinkhrefFilter filter in ng2 (see IconComponent)
import xlinkhrefFilter from './icon/xlinkhref.filter';
import uploadDirective from './upload/upload.directive';
import CadSelect4Directive from './select4/select4.directive';
import CadSelect4ItemTemplateDirective from './select4/select4-item-template.directive';
import CadSelect4ItemSelectedTemplateDirective from './select4/select4-item-selected-template.directive';
import {Select4Controller} from './select4/select4.controller';
import pageTitleDirective from './page-title/page-title.directive';
import wheelDirective from './wheel/wheel.directive';
import {cadAutofocusDirective} from './autofocus/autofocus.directive';
import {cadStickyHeader} from './sticky-header/sticky-header.directive';
import {trackFormChangesDirective} from './track-unsaved/track-form-changes.directive';
import requiredDirective from './required/required.directive';
import {CadValidationErrorMessagesDirective} from './validation-errors/validation-error-messages.directive';
import {ValidationErrorMessagesService} from './validation-errors/validation-error-messages.service';
import {uiGridPagerComponent} from './ui-grid-pager/ui-grid-pager.component';
import {cadPreviousStateDirective} from './previous-state/previous-state.directive';
import {BannerComponent} from './banner/banner.component';
import {BannerService} from './banner/banner.service';
import {InformerTooltipComponent} from './tooltip/informer/informer.component';
import {SmartSearchFilterComponent} from './dropdown-filters/smart-search-filter/smart-search-filter.component';
import {ItemsFilterComponent} from './dropdown-filters/item-filter/items-filter.component';
import {popupComponent} from './popup/popup.component';
import {SmartFilterComponent} from './smart-filter/smart-filter.component';
import {SmartFilterService} from './smart-filter/smart-filter.service';
import {SmartFilterItemComponent} from './smart-filter/item/smart-filter-item.component';
import {SmartFilterSearchComponent} from './smart-filter/item/search/smart-filter-search.component';
import {SmartFilterDropdownComponent} from './smart-filter/item/dropdown/smart-filter-dropdown.component';
import {RouterOutletComponent} from './router-outlet/router-outlet.component';

// Downgrade components
import {TooltipContainerComponent} from '../../ng2/common/components/';
import {SimpleMessageContainerComponent, SystemMessageContainerComponent} from '../../ng2/message';
import {SupportButtonComponent, SupportPopupComponent} from '../../ng2/support';
import {
  NotificationMessageComponent, NotificationInboxComponent, NotificationsToastComponent
} from '../../ng2/header';
import {MultiMarketsTooltipComponent} from '../../ng2/header';
import {SearchGlobalComponent} from './../../ng2/header';
import {NavigationMenuComponent} from '../../ng2/header';
import {BackgroundProcessesComponent} from '../../ng2/header';

const ngModule = angular.module('cadreon.core.components', [
  'pascalprecht.translate',
  'vs-repeat',
  'ui.router',
  'ui.bootstrap',
  'ct.ui.router.extras.previous',
  servicesModule.name,
  filtersModule.name,
  authModule.name,
  currencyModule.name
]);

ngModule
   // services
  .service('validationErrorMessagesService', ValidationErrorMessagesService)
  .service('bannerService', BannerService)
  .service('smartFilterService', SmartFilterService)

  // controllers
  .controller('select4Controller', <ng.IControllerConstructor> Select4Controller)

  // directives
  .directive('cadNumber', CadNumberDirective)
  .directive('cadClickOut', cadClickOutDirective)
  .directive('cadDateTimePicker', CadDateTimePickerDirective)
  .directive('cadValidatePeriodDays', cadValidatePeriodDays)
  .directive('cadSelect4', CadSelect4Directive)
  .directive('cadSelect4ItemTemplate', CadSelect4ItemTemplateDirective)
  .directive('cadSelect4ItemSelectedTemplate', CadSelect4ItemSelectedTemplateDirective)
  .directive('cadAutofocus', cadAutofocusDirective)
  .directive('cadTrackFormChanges', trackFormChangesDirective)
  .directive('cadStickyHeader', cadStickyHeader)
  .directive('cadValidationErrorMessages', CadValidationErrorMessagesDirective)
  .directive('cadTileIcon', CadTileIcon)
  .directive('cadPreviousState', cadPreviousStateDirective)
  .directive('cadDateTimeValidateAfter',
             dateTimeValidationDirectiveFactory('cadDateTimeValidateAfter', validateAfterFn))
  .directive('cadDateTimeValidateAfterOrEqual',
             dateTimeValidationDirectiveFactory('cadDateTimeValidateAfterOrEqual', validateAfterOrEqualFn))
  .directive('cadDateTimeValidateBefore',
             dateTimeValidationDirectiveFactory('cadDateTimeValidateBefore', validateBeforeFn))
  .directive('cadDateTimeValidateBeforeOrEqual',
             dateTimeValidationDirectiveFactory('cadDateTimeValidateBeforeOrEqual', validateBeforeOrEqualFn))
  .directive('cadDropdown', CadDropdownDirective)
  // components
  .component('cadUiGridPager', uiGridPagerComponent)
  .component('cadBanner', BannerComponent)
  .component('cadInformerTooltip', InformerTooltipComponent)
  .component('cadSmartSearchFilter', SmartSearchFilterComponent)
  .component('cadItemsFilter', ItemsFilterComponent)
  .component('cadPopup', popupComponent)
  .component('cadSmartFilter', SmartFilterComponent)
  .component('cadSmartFilterItem', SmartFilterItemComponent)
  .component('cadSmartFilterSearch', SmartFilterSearchComponent)
  .component('cadSmartFilterDropdown', SmartFilterDropdownComponent)
  .component('cadRouterOutlet', RouterOutletComponent)
;

// Downgrade components
const ngxComponents = <any> [
  ['cadNgxTooltipContainer', TooltipContainerComponent],
  ['cadNgxNotificationInbox', NotificationInboxComponent],
  ['cadNgxNotificationMessage', NotificationMessageComponent],
  ['cadNgxNotificationsToast', NotificationsToastComponent],
  ['cadNgxSimpleMessageContainer', SimpleMessageContainerComponent],
  ['cadNgxSystemMessageContainer', SystemMessageContainerComponent],
  ['cadNgxSearchGlobal', SearchGlobalComponent],
  ['cadNgxSupportButton', SupportButtonComponent],
  ['cadNgxSupportPopup', SupportPopupComponent],
  ['cadNgxMultiMarketsTooltip', MultiMarketsTooltipComponent],
  ['cadNgxNavigationMenu', NavigationMenuComponent],
  ['cadNgxBackgroundProcesses', BackgroundProcessesComponent]
];

_.map(ngxComponents, ([name, component]) =>  ngModule.directive(name, downgradeComponent({component})));

ngModule.run(($templateCache) => {
  'ngInject';
  $templateCache.put('copy-clipboard-template.html', require('./tooltip/copy-clipboard-template.html'));
  $templateCache.put(
    'validation-error-messages-icon.html',
    require('./validation-errors/validation-error-messages-icon.html'));
  $templateCache.put(
    'validation-error-messages-text.html',
    require('./validation-errors/validation-error-messages-text.html'));
});

modalConfig(ngModule);
modalSpinnerDirective(ngModule);
subheaderDirective(ngModule);
buttonDirective(ngModule);
inputProfileDirective(ngModule);
inlineInputDirective(ngModule);
searchDirective(ngModule);
searchListDirective(ngModule);
itemsSelectorDirective(ngModule);
iconDirective(ngModule);
iconDynamicDirective(ngModule);
paginationDirective(ngModule);
linkActionDirective(ngModule);
linkDirective(ngModule);
stickyDirective(ngModule);
selectDirective(ngModule);
selectItemDirective(ngModule);
tabsDirective(ngModule);
tabsItemDirective(ngModule);
chipDirective(ngModule);
tileDirective(ngModule);
statusDirective(ngModule);
statusButtonDirective(ngModule);
switchesDirective(ngModule);
switchBtnDirective(ngModule);
switchRadioDirective(ngModule);
switchCheckboxDirective(ngModule);
toggleDirective(ngModule);
tagsDirective(ngModule);
columnDirective(ngModule);
panelDirective(ngModule);
panelHeadDirective(ngModule);
panelContentDirective(ngModule);
smartSearchListDirective(ngModule);
smartTooltipEnableDirective(ngModule);
xlinkhrefFilter(ngModule);
uploadDirective(ngModule);
pageTitleDirective(ngModule);
wheelDirective(ngModule);
requiredDirective(ngModule);

export default ngModule;
