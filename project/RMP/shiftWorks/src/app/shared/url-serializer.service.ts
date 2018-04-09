import {DefaultUrlSerializer, UrlTree} from '@angular/router';

/**
 * Lower Case Url Serializer
 */

export class LowerCaseUrlSerializer extends DefaultUrlSerializer {

  /**
   * Method for parse
   * @param {string} url
   * @returns {UrlTree}
   * @memberof AuthGuardService
   */

  parse(url: string): UrlTree {
    return super.parse(url.toLowerCase());
  }
}
