export default (ngModule) => {
  /*@ngInject*/
  function IndustryCategoriesResource($resource, configService) {
    let url = configService.getCMBaseURL() + 'industrycategories';
    return $resource(url, {sf_account_id: '@sf_account_id'}, {
      get: {
        method: 'GET',
        isArray: true
      },
      getByAdvertiser: {
        method: 'GET',
        url: url + '/sf/account/:sf_account_id'
      }
    });
  }

  ngModule.factory('industryCategoriesResource', IndustryCategoriesResource);
};
