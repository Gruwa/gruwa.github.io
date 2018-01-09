// polyfills required to run angular2 ( https://angular.io/guide/browser-support#mandatory-polyfills )
import 'core-js';
import 'zone.js';

if (ENVIRONMENT !== 'unitTest') {
  require('web-animations-js');
}

if (ENVIRONMENT !== 'production') {
  Error['stackTraceLimit'] = Infinity; // tslint:disable-line
  require('zone.js/dist/long-stack-trace-zone'); // use "require()" as "import" is not allowed in this place
}

// Adding finally function to Promise
// Actually it's emulate
// Promise.resolve(...)
// .then()
// .catch()
// .then(callback(), callback())
Promise.prototype['finally'] = function(callback) { // tslint:disable-line
  let p = this.constructor;
  // We don’t invoke the callback in here,
  // because we want then() to handle its exceptions
  return this.then(
    // Callback fulfills: pass on predecessor settlement
    // Callback rejects: pass on rejection (=omit 2nd arg.)
    value => p.resolve(callback()).then(() => value),
    reason => p.resolve(callback()).then(() => {
      throw reason;
    })
  );
};
