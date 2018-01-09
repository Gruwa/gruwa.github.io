import * as ng from 'angular';

// see Module Augmentation in https://www.typescriptlang.org/docs/handbook/declaration-merging.html
declare module "angular" {
  interface IRequestShortcutConfig {
    suppressMarket?: boolean; // flag to omit cad-market header addition
    suppressAuthorization?: boolean; // flag to omit adding bearer token to request headers
    method?: string;
    prefix?: string;
    url?: string;
  }
}

// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/promise.prototype.finally/index.d.ts
declare global {
  interface Promise<T> {
    finally<U>(onFinally?: () => U | PromiseLike<U>): Promise<T>;

    // TODO: Remove fixes for ng1 $http service
    then<TResult>(
      successCallback: (promiseValue: T) => Promise<TResult> | TResult,
      errorCallback?: (reason: any) => any,
      notifyCallback?: (state: any) => any
    ): Promise<TResult>;

    catch<TResult>(
      onRejected: (reason: any) => Promise<TResult> | TResult
    ): Promise<TResult>;
  }

  interface FileReader {
    new (): FileReader;
  }

  interface Image {
    new (): HTMLImageElement;
  }

  interface Window {
    FileReader: FileReader,
    Image: Image
  }
}
