import {Injectable} from '@angular/core';
import {FlowService} from '../../shared/services/flow.service';
import {HttpService} from '../../shared/services/http.service';

/**
 * Settings Service
 */

@Injectable()
export class SettingsService {

  /**
   * Creates an instance of SettingsService
   * @param {HttpService} httpService
   * @param {FlowService} flowService
   * @memberof SettingsService
   */

  constructor(private flowService: FlowService,
              private httpService: HttpService) {
    this.getSettingsData();
  }

  /**
   * Method for get Settings Data
   * @returns {void}
   * @memberof SettingsService
   */

  getSettingsData(): void {
    this.httpService.getSettings();
  }
}
