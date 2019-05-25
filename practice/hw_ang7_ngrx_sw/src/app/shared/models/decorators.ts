import {BehaviorSubject} from 'rxjs';

/**
 * Export of Template decorator
 */

export function Template() {
  return function (target: any, key: string) {
    const behavior = new BehaviorSubject(undefined);
    const res = behavior.asObservable();
    Object.defineProperty(target, key, {
      configurable: false,
      get: () => res,
      set: (value: any) => {
        behavior.next(value);
      },
    });
  };
}

/**
 * Export of Async decorator
 */

export function Async(setHandler?: string) {
  return function (target: any, key: string) {
    const accessor = `${key}$`;
    const secret = `_${key}$`;
    const _setHandler = setHandler;

    Object.defineProperty(target, accessor, {
      get: function () {
        if (!this[secret])
          this[secret] = new BehaviorSubject(undefined);
        return this[secret];
      },
      set: function () {
        throw new Error('You cannot set this property in the Component if you use @ObservableProperty');
      },
    });

    Object.defineProperty(target, key, {
      get: function () {
        return this[accessor];
      },
      set: function (value: any) {
        this[accessor].next(value);
        if (_setHandler && typeof this[_setHandler] === 'function')
          this[_setHandler](value, key);
      },
    });
  }
}
