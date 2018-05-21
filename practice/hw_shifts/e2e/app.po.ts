import {browser, by, element} from 'protractor';

/**
 * Export class AppPage
 */

export class AppPage {

  /**
   * Method navigateTo
   * @returns {any}
   * @memberof AppPage
   */

  navigateTo(): any {
    return browser.get('/');
  }

  /**
   * Method getParagraphText
   * @returns {any}
   * @memberof AppPage
   */

  getParagraphText(): any {
    return element(by.css('app-root h1')).getText();
  }
}
