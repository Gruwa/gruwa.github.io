import * as moment from 'moment-timezone';
import {Injectable} from '@angular/core';

// Timezones are taken from
// https://github.com/mishguruorg/angular-timezone-selector/blob/master/dist/angular-timezone-selector.js
// see https://github.com/mishguruorg/angular-timezone-selector
// they use initially this resource https://timezonedb.com/download
import {TimezoneZones} from './timezones';
import {TimezoneCodes} from './timezones';
import {IMarketTimezone} from '../../../common';

export interface ICountry {
  cca2: string;
  name: string;
}

interface ITimeZone {
  id: string;
  cca2: string;
  name: string;
}

export interface ITimezoneInfo {
  id: number;
  country: ICountry;
  name: string;  // for saving
  title: string; // for displaying
  offset: string;
}

@Injectable()
export class TimezoneService {
  timezonesInfo: ITimezoneInfo[] = [];

  constructor() {
    this.timezonesInfo = this.getTimezonesInfo();
  }

  get allCountries(): ICountry[] {
    return TimezoneCodes;
  }

  getTimezoneByName(name: string): ITimezoneInfo {
    if (!name) {
      return null;
    }

    let timezone = _.find(this.timezonesInfo, {name});

    return timezone;
  }

  private getTimezonesInfo(): ITimezoneInfo[] {
    return _(TimezoneZones)
      .map((zone: ITimeZone): ITimezoneInfo => {
        let tz = moment.tz(zone.name);
        let offset = 'UTC' + tz.format('Z');
        let country = _.find(TimezoneCodes, {cca2: zone.cca2});
        return {
          id: Number(zone.id),
          country,
          name: zone.name,
          title: offset + '/' + country.name + '/' + zone.name.replace(/_/g, ' '),
          offset
        };
      })
      .sortBy(['offset'])
      .value();
  }

}
