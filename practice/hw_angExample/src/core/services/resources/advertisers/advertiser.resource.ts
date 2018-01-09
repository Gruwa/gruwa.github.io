export interface IAdvertiser extends ng.resource.IResource<IAdvertiser> {
  advertiserId: string;
  agency: any;
  agencyName: string;
  brands: any[];
  classification: string;
  currencyCode: string;
  id: number;
  industries: string[];
  isBrand: boolean;
  market: string;
  name: string;
  opportunitiesCount: number;
  parentAccount: any;
  sfAccountId: string;
}

/* tslint:disable:no-empty-interface */
export type IAdvertisersResource = ng.resource.IResourceClass<IAdvertiser>;

export function AdvertisersResource(
  $resource: ng.resource.IResourceService
): IAdvertisersResource {
  'ngInject';

  let url = 'advertisers/:id';

  let actions = {
    query: {
        prefix: 'shell',
        method: 'GET',
        cache: true // we cache advertisers requests assuming that advertisers data doesn't change during user session
      },
    get: {
      prefix: 'shell',
      method: 'GET'
    }
  };

  return <IAdvertisersResource> $resource(url, {}, actions);
}
