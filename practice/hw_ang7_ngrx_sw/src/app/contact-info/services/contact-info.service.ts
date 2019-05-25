import {Injectable} from '@angular/core';
import {HttpService} from '../../shared/services/http.service';

/**
 * Contact Info Service
 */

@Injectable()
export class ContactInfoService {

  /**
   * Creates an instance of SettingsService
   * @param {HttpService} httpService
   * @memberof SettingsService
   */

  constructor(private httpService: HttpService) {
    this.getDataContactInfo();
  }

  /**
   * Method for get Data of ContactInfo
   * @returns {void}
   * @memberof SettingsService
   */

  getDataContactInfo(): void {
    this.httpService.getContactInfo();
  }
}
