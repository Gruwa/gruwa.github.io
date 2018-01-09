import {Inject, Injectable} from '@angular/core';

export interface IPermission {
  permission: string;
  name: string;
  app: string; // Todo define app type?
}

@Injectable()
export class PermissionsService {
  constructor(
    @Inject('$http') private $http: ng.IHttpService
  ) {}

  getAll(): ng.IPromise<IPermission[]> {
    return this.$http<IPermission[]>({
      method: 'GET',
      prefix: 'user',
      cache: true, // dictionary data
      url: 'permissions'
    }).then(response => response.data);
  }

  create(permission: IPermission): ng.IPromise<IPermission> {
    return this.$http<IPermission>({
      method: 'POST',
      prefix: 'user',
      url: 'permissions',
      data: permission
    }).then(response => response.data);
  }
}
