import * as moment from 'moment';
import {IAuditTrailEntity, AuditTrailService, IAuditTrailSourceParams} from '../services/audit-trail.service';
import {IDateRange, DateRangeConfigService, IDateRangeOptions} from '../../date-range';

const AUDIT_TRAIL_TEMPLATE_TABLE = 'table';
const AUDIT_TRAIL_TEMPLATE_BLOCK = 'block';

export class AuditTrailController {
  // bindings
  entity: IAuditTrailEntity;
  currentEntityId: string;
  entityName: string;
  entityTitle: string;
  entityType: string;
  text: string;
  showStickyHeader: boolean;
  outputType: string;
  showDateRangeQuery: boolean;
  showSearchQuery: boolean;

  // public members
  logs = [];
  status = 'init';
  searchQuery = '';
  detailsPageSize: number;
  logDates: IDateRange<moment.Moment>;
  dateRangeOptions: IDateRangeOptions;

  constructor(
    private $scope: ng.IScope,
    private cadAuditTrailService: AuditTrailService,
    private dateRangeConfigService: DateRangeConfigService
  ) {
    'ngInject';

    this.detailsPageSize = this.cadAuditTrailService.detailsPageSize;
    if (_.isUndefined(this.showDateRangeQuery)) {
      this.showDateRangeQuery = true;
    }

    if (this.entity) {
      this.currentEntityId = angular.copy(this.entity.id);
    }

    if (this.showDateRangeQuery) {
      this.initDatePicker();
      this.$scope.$watch(() => this.logDates, this.fetchData.bind(this));
    }
  }

  $onInit() {
    if (!this.outputType || !_.includes([AUDIT_TRAIL_TEMPLATE_TABLE, AUDIT_TRAIL_TEMPLATE_BLOCK], this.outputType)) {
      this.outputType = AUDIT_TRAIL_TEMPLATE_TABLE;
    }
    this.fetchData();
  }

  $doCheck() {
    if (this.entity && this.currentEntityId !== this.entity.id) {
      this.currentEntityId = angular.copy(this.entity.id);
      this.fetchData();
    }
  }

  // TODO: Simplify
  fetchData() {
    if (!this.isValid()) {
      return;
    }

    this.status = 'loading';

    let urlOptions: IAuditTrailSourceParams = {
      entityName: this.entityName,
      entityType: this.entityType
    };

    let params = {};

    if (this.entity) {
      urlOptions.entityId = this.entity.id;
    }

    if (this.showDateRangeQuery) {
      params = {
        startTs: moment(this.logDates.startDate).format('YYYY-MM-DDT00:00:00'),
        endTs: moment(this.logDates.endDate).add(1, 'day').format('YYYY-MM-DDT00:00:00')
      };
    }

    this.cadAuditTrailService.getChangeLog(urlOptions, params, this.entity ? this.entity.currencyIsoCode : 'US')
      .then((response) => {
        this.logs = response;
        this.status = response.length > 0 ? 'done' : 'empty';
      })
      .catch(() => {
        this.status = 'error';
      });
  }

  private initDatePicker() {
    this.logDates = {
      startDate: moment().subtract(6, 'days'),
      endDate: moment()
    };

    this.dateRangeOptions = angular.merge(this.dateRangeConfigService.get(),  {locale: {format: 'll'}});
  }

  private isValid() {
    if (this.showDateRangeQuery) {
      return this.logDates.startDate && this.logDates.endDate;
    }
    return true;
  }
}

export const auditTrailComponent: ng.IComponentOptions = {
  template: require('./audit-trail.html'),
  controller: AuditTrailController,
  controllerAs: 'vm',
  transclude: {
    cadAuditTrailStickyHeader: '?cadAuditTrailStickyHeader'
  },
  bindings: {
    entity: '<',
    entityName: '@',
    entityTitle: '@',
    entityType: '@',
    outputType: '@',
    text: '@',
    showStickyHeader: '=',
    showSearchQuery: '=?',
    showDateRangeQuery: '=?',
    backClick: '&'
  }
};
