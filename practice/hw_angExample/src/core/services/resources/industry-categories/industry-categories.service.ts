export default (ngModule) => {
  /*@ngInject*/
  function IndustryCategoriesService(industryCategoriesResource) {
    this.getIndustryCategories = getIndustryCategories;
    this.getIndustryCategoryByAdvertiser = getIndustryCategoryByAdvertiser;

    function getIndustryCategories() {
      return industryCategoriesResource.get().$promise;
    }

    function getIndustryCategoryByAdvertiser(id) {
      return industryCategoriesResource.getByAdvertiser({sf_account_id: id}).$promise;
    }
  }

  ngModule.service('industryCategoriesService', IndustryCategoriesService);
};
