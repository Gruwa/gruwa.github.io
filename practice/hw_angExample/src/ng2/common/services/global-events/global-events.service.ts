import {Injectable} from '@angular/core';

interface IEventListener {
  [key: string]: Function[];
}

@Injectable()
export class GlobalEventsService {
  private listeners: IEventListener = {};

  on(name: string, listener: Function) {
    if (!_.has(this.listeners, name)) {
      this.listeners[name] = [];
    }

    this.listeners[name].push(listener);
    return () => this.off(name, listener);
  }

  off(name: string, listener: Function) {
    if (listener) {
      _.remove(this.listeners[name], (l: Function) => l === listener);
    }
  }

  broadcast(name: string, ...args) {
    _.each(this.listeners[name], listener => listener(...args));
  }
}
