import * as VERSION_GLOBAL from '../../globals';

/**
 * Variable version
 * Production, Beta, Alpha(Demo in sprint), Global change, Light change
 * @type {Array<object>}
 * @memberof AppComponent
 */

const versions: Array<object> = [
  {
    version: '0.0.0.0.1',
    date: '06/25/2018',
    description: ''
  },
  {
    version: '0.0.0.0.2',
    date: '06/25/2018',
    description: 'First real demo, build with --aot'
  },
  {
    version: '0.0.0.0.3',
    date: '06/25/2018',
    description: 'Story 11705'
  },
  {
    version: '0.0.1.0.0',
    date: '06/27/2018',
    description: 'Demo'
  },
  {
    version: '0.0.1.1.0',
    date: '07/03/2018',
    description: 'Rewrite header component'
  },
  {
    version: '0.0.1.3.0',
    date: '07/03/2018',
    description: 'Component availability'
  },
  {
    version: '0.0.1.3.2',
    date: '07/05/2018',
    description: 'Component availability + fix bug with error'
  },
  {
    version: '0.0.1.3.3',
    date: '07/05/2018',
    description: 'Rewrite interceptor'
  },
  {
    version: '0.0.1.4.1',
    date: '07/09/2018',
    description: 'Create availability'
  },
  {
    version: '0.0.1.4.2',
    date: '07/09/2018',
    description: 'DELETE availability'
  },
  {
    version: '0.0.1.4.3',
    date: '07/09/2018',
    description: 'EDIT availability'
  },
  {
    version: '0.0.1.4.4',
    date: '07/09/2018',
    description: 'POST availability'
  },
  {
    version: '0.0.1.5.0',
    date: '07/10/2018',
    description: 'Contact Info'
  },
  {
    version: '0.0.2.0.0',
    date: '07/12/2018',
    description: 'Demo'
  },
  {
    version: '0.0.2.0.1',
    date: '07/12/2018',
    description: 'Edit Contact Info'
  },
  {
    version: '0.0.2.0.2',
    date: '07/13/2018',
    description: 'remember me'
  },
  {
    version: '0.0.2.0.3',
    date: '07/13/2018',
    description: '12417'
  },
  {
    version: '0.0.2.1.0',
    date: '07/17/2018',
    description: '12410'
  },
  {
    version: '0.0.2.1.1',
    date: '07/17/2018',
    description: '12495 Edit availability'
  },
  {
    version: '0.0.2.1.2',
    date: '07/18/2018',
    description: '12495 && 12424'
  },
  {
    version: '0.0.2.1.3',
    date: '07/21/2018',
    description: '12864'
  },
  {
    version: '0.0.2.2.1',
    date: '07/23/2018',
    description: '12907'
  },
  {
    version: '0.0.2.2.2',
    date: '07/23/2018',
    description: '12906, 12907'
  },
  {
    version: '0.0.2.2.3',
    date: '07/24/2018',
    description: '12953'
  },
  {
    version: '0.0.3.0.0',
    date: '07/26/2018',
    description: 'Demo'
  },
  {
    version: '0.0.3.0.1',
    date: '07/31/2018',
    description: '13193, 13203'
  },
  {
    version: VERSION_GLOBAL.VERSION,
    'version of development': '0.0.3.0.2',
    date: '08/02/2018',
    description: '13033, 13241'
  },
  {
    version: VERSION_GLOBAL.VERSION,
    'version of development': '0.0.3.0.3',
    date: '08/02/2018',
    description: '13187'
  },
  {
    version: VERSION_GLOBAL.VERSION,
    'version of development': '0.0.3.0.4',
    date: '08/02/2018',
    description: '13034'
  },
  {
    version: VERSION_GLOBAL.VERSION,
    'version of development': '0.0.3.0.5',
    date: '08/02/2018',
    description: '13406'
  },
  {
    version: VERSION_GLOBAL.VERSION,
    'version of development': '0.0.3.0.6',
    date: '08/17/2018',
    description: '13665'
  },
  {
    version: VERSION_GLOBAL.VERSION,
    'version of development': '0.0.3.0.12',
    date: '08/17/2018',
    description: '14159'
  },
  {
    version: VERSION_GLOBAL.VERSION,
    'version of development': '0.0.4.0.0',
    date: '08/22/2018',
    description: 'Demo'
  },
  {
    version: VERSION_GLOBAL.VERSION,
    'version of development': '0.0.4.1.0',
    date: '08/27/2018',
    description: '14144'
  },
  {
    version: VERSION_GLOBAL.VERSION,
    'version of development': '0.0.4.1.1',
    date: '08/27/2018',
    description: '144397, 14407'
  },
  {
    version: VERSION_GLOBAL.VERSION,
    'version of development': '0.0.4.2.0',
    date: '08/28/2018',
    description: '14145'
  },
  {
    version: VERSION_GLOBAL.VERSION,
    'version of development': '0.0.4.2.1',
    date: '08/28/2018',
    description: '14470'
  },
  {
    version: VERSION_GLOBAL.VERSION,
    'version of development': '0.0.4.2.2',
    date: '08/28/2018',
    description: '14482'
  },
  {
    version: VERSION_GLOBAL.VERSION,
    'version of development': '0.0.4.2.3',
    date: '08/28/2018',
    description: '14472'
  },
  {
    version: VERSION_GLOBAL.VERSION,
    'version of development': '0.0.4.2.4',
    date: '08/28/2018',
    description: '14497'
  },
  {
    version: VERSION_GLOBAL.VERSION,
    'version of development': '0.0.4.2.5',
    date: '08/29/2018',
    description: '13641'
  },
  {
    version: VERSION_GLOBAL.VERSION,
    'version of development': '0.0.4.2.6',
    date: '08/29/2018',
    description: '14245'
  },
  {
    version: VERSION_GLOBAL.VERSION,
    'version of development': '0.0.4.2.7',
    date: '08/29/2018',
    description: '13641 fix bug'
  },
  {
    version: VERSION_GLOBAL.VERSION,
    'version of development': '0.0.4.2.8',
    date: '08/30/2018',
    description: '14555'
  },
  {
    version: VERSION_GLOBAL.VERSION,
    'version of development': '0.0.4.2.9',
    date: '08/30/2018',
    description: '14555 change logic of cleaning flow'
  },
  {
    version: VERSION_GLOBAL.VERSION,
    'version of development': '0.0.4.2.10',
    date: '08/30/2018',
    description: '14555 add close sidebar with 401 error'
  },
  {
    version: VERSION_GLOBAL.VERSION,
    'version of development': '0.0.4.2.11',
    date: '09/03/2018',
    description: '14555 fix refreshing data on contact and setting pages'
  },
  {
    version: VERSION_GLOBAL.VERSION,
    'version of development': '0.0.4.2.12',
    date: '09/03/2018',
    description: '14555 fix sending second request when module activate'
  },
  {
    version: VERSION_GLOBAL.VERSION,
    'version of development': '0.0.4.2.13',
    date: '09/04/2018',
    description: '14555 fix static url'
  },
  {
    version: VERSION_GLOBAL.VERSION,
    'version of development': '0.0.4.2.14',
    date: '01/10/2019',
    description: '17673'
  },
  {
    version: VERSION_GLOBAL.VERSION,
    'version of development': '0.0.4.2.15',
    date: '01/10/2019',
    description: '17191'
  },
  {
    version: VERSION_GLOBAL.VERSION,
    'version of development': '0.0.4.2.16',
    date: '01/10/2019',
    description: '18196 update Angular 7.2'
  },
  {
    version: VERSION_GLOBAL.VERSION,
    'version of development': '0.0.4.2.17',
    date: '01/10/2019',
    description: '18196 ServiceWorker'
  },
  {
    version: VERSION_GLOBAL.VERSION,
    'version of development': '0.0.4.2.18',
    date: '01/19/2019',
    description: '16213'
  },
  {
    version: VERSION_GLOBAL.VERSION,
    'version of development': '0.0.4.2.19',
    date: '01/22/2019',
    description: '21271'
  },
  {
    version: VERSION_GLOBAL.VERSION,
    'version of development': '0.0.4.2.20',
    date: '01/22/2019',
    description: '21147'
  },
  {
    version: VERSION_GLOBAL.VERSION,
    'version of development': '1.0.0.0.0',
    date: '02/14/2019',
    description: 'Release'
  },
  ,
  {
    version: VERSION_GLOBAL.VERSION,
    'version of development': '1.0.0.0.1',
    date: '03/08/2019',
    description: '23713'
  },
  {
    version: VERSION_GLOBAL.VERSION,
    'version of development': '1.0.0.0.2',
    date: '05/07/2019',
    description: '26231'
  },
  {
    version: VERSION_GLOBAL.VERSION,
    'version of development': '1.0.0.0.3',
    date: '03/09/2019',
    description: '23552'
  },
  {
    version: VERSION_GLOBAL.VERSION,
    'version of development': '1.0.0.0.4',
    date: '05/14/2019',
    description: '26244'
  },
  {
    version: VERSION_GLOBAL.VERSION,
    'version of development': '1.0.0.0.5',
    date: '05/14/2019',
    description: '26426'
  },
  {
    version: VERSION_GLOBAL.VERSION,
    'version of development': '1.0.0.0.6',
    date: '05/15/2019',
    description: '23448'
  },
  {
    version: VERSION_GLOBAL.VERSION,
    'version of development': '1.0.0.0.7',
    date: '05/17/2019',
    description: '21676'
  },
  {
    version: VERSION_GLOBAL.VERSION,
    'version of development': '1.0.0.0.8',
    date: '05/17/2019',
    description: '26134'
  },
  {
    version: VERSION_GLOBAL.VERSION,
    'version of development': '1.0.0.0.9',
    date: '05/17/2019',
    description: '21899'
  },
  {
    version: VERSION_GLOBAL.VERSION,
    'version of development': '1.0.0.0.10',
    date: '05/17/2019',
    description: '26134 part II'
  },
  {
    version: VERSION_GLOBAL.VERSION,
    'version of development': '1.0.0.0.11',
    date: '05/17/2019',
    description: '26543'
  },
  {
    version: VERSION_GLOBAL.VERSION,
    'version of development': '1.0.0.0.12',
    date: '05/17/2019',
    description: '26540'
  },
  {
    version: VERSION_GLOBAL.VERSION,
    'version of development': '1.0.0.0.13',
    date: '05/22/2019',
    description: '26648'
  }
];

/**
 * Variable VERSION
 * @type {boolean}
 * @memberof AppComponent
 */

export const VERSION = versions[versions.length - 1];
