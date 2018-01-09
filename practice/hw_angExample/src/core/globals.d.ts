import * as _ from 'lodash';
import * as ng from 'angular';
import * as Sinon from 'sinon';

declare namespace webpack {
  interface Require {
    (path: string): any;
    context: ContextFn;
  }

  interface ContextAPI {
    (path: string): any;
    resolve: (path: string) => string;
    keys: () => string[];
    id: string;
  }

  type ContextFn = (directory: string, useSubdirectories: boolean, matchRegExp: RegExp) => ContextAPI;
}

declare global {
  // webpack stuff
  let require: webpack.Require;

  // DefinePlugin build variables:
  let ENVIRONMENT: string;
  let WHITELABEL: {
    absolutePath: string;
  };
  let AUTH: {
    key: string;
    secret: string;
  };

  // vendors that are injected into global namespace
  // this is hack to avoid explicit importing types "import * as angular from 'angular'" everywhere
  let angular: ng.IAngularStatic;
  let _: _.LoDashStatic;

  // unit test global functions
  let sinon: Sinon.SinonStatic;
  let expect: Chai.ExpectStatic;
}
