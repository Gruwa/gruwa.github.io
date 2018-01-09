import dateRangeModule from '../date-range';
import filtersModule from '../filters';
import authModule from '../auth';
import currencyModule from '../currency';
import numberModule from '../number';

import {AuditTrailService} from './services/audit-trail.service';
import {auditTrailComponent} from './components/audit-trail.component';
import {auditTrailTableComponent} from './components/audit-trail-table.component';
import {auditTrailBlockComponent} from './components/audit-trail-block.component';
import {auditTrailDspadvertiserTileComponent} from './components/audit-trail-dspadvertiser-tile.component';

const ngModule = angular.module('cadreon.core.auditTrail', [
  'pascalprecht.translate',
  authModule.name,
  currencyModule.name,
  filtersModule.name,
  numberModule.name,
  dateRangeModule.name
]);

ngModule.service('cadAuditTrailService', AuditTrailService);
ngModule.component('cadAuditTrail', auditTrailComponent);
ngModule.component('cadAuditTrailTable', auditTrailTableComponent);
ngModule.component('cadAuditTrailBlock', auditTrailBlockComponent);
ngModule.component('cadAuditTrailDspadvertiserTile', auditTrailDspadvertiserTileComponent);

export default ngModule;
