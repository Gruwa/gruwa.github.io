
/**
 * Variable version
 * @type {Array<object>}
 * @memberof AppComponent
 */

const versions: Array<object> = [
  {
    version: '0.0.0.1',
    date: '06/25/2018',
    description: ''
  },
  {
    version: '0.0.0.2',
    date: '06/25/2018',
    description: 'First real demo, build with --aot'
  },
  {
    version: '0.0.0.3',
    date: '06/25/2018',
    description: 'Story 11705'
  },
  {
    version: '0.0.1.0',
    date: '06/27/2018',
    description: 'Sprint Demo'
  }
];

/**
 * Variable VERSION
 * @type {boolean}
 * @memberof AppComponent
 */

export const VERSION = versions[versions.length - 1];