import {identity, isNil, isObject} from 'lodash';
import {cadNoDataSymbol} from '../../cadreon.const';

export interface IAuditTrailEntity {
  id: string;
  currencyIsoCode: string;
}

// TODO: Update type
type IAuditTraiChangelog = any;

export interface IAuditTrailSourceParams {
  entityName: string;
  entityType: string;
  entityId?: string;
}

export class AuditTrailService {
  detailsPageSize = 5;
  // TODO: Do we need to specify type here? This property is private
  private formaters: any;

  constructor(private $filter: cad.IFilterService,
              private $http: ng.IHttpService) {
    'ngInject';

    this.initFormatters();
  }

  getChangeLog(urlParams: IAuditTrailSourceParams, params, currencyCode: string) {
    let url = 'changelog/' + urlParams.entityName;

    if (urlParams.entityId) {
      url += '/' + urlParams.entityId;
    }

    let config = { params, prefix: urlParams.entityType };

    return this.$http.get(url, config)
      .then((resp) => {
        let result: IAuditTraiChangelog = _.get(resp, 'data', []);
        if (result.changeLog) {
          result = _.get(resp, 'data.changeLog', []);
        }
        return this.formatLogData(result, currencyCode);
      });
  }

  // TODO: formatters should be revised in TechDebt. New filters appeared that should substitute current
  private initFormatters() {
    this.formaters = {
      date: (value) => {
        return value ? this.$filter('cadDateTZ')(value, 'mediumDate') : cadNoDataSymbol;
      },
      datetime: (value) => {
        return value ? this.$filter('cadDateTZ')(value, 'mediumDateShortTime') : cadNoDataSymbol;
      },
      currency: (value, currencyCode) => {
        return this.$filter('cadCurrency')(value, currencyCode);
      },
      t_decimal: (value) => {
        return !isNil(value) ? this.$filter('number')(value) : '—';
      },
      t_int: (value) => {
        return !isNil(value) ? this.$filter('number')(value) : '—';
      },
      t_long: (value) => {
        return this.$filter('cadNumber')(value);
      },
      t_boolean: (value) => {
        return _.isBoolean(value)
          ? this.$filter('translate')('audit_trail.formatter.t_boolean.' + value.toString())
          : cadNoDataSymbol;
      },
      text: (value) => {
        return value || cadNoDataSymbol;
      },
      percent: (value) => {
        return this.$filter('cadPercent')(value);
      },
      list: (value) => {
        return this.formatList(value);
      }
    };
  }

  private formatLogData(data, currencyCode: string) {
    return _.map(data, (item: any) => {
      if (item && item.changedFields && item.changedFields.length) {
        item.pageSize = this.detailsPageSize;
        item.changedFields = _.map(item.changedFields, (field: any) => {
          const formatter = this.formaters[field.type] || identity;
          field.oldValue = formatter(field.oldValue, currencyCode);
          field.newValue = formatter(field.newValue, currencyCode);
          return field;
        });
      }
      return item;
    });
  }

  private formatList(value) {
    if (_.isArray(value) && value.length) {
      return !isObject(value[0]) ? value.join(', ') : value;
    }

    return cadNoDataSymbol;
  }
}
