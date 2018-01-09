import ngModule from './resources.module';

import advertiserResourceSpec from './advertisers/advertiser.resource.spec';
import advertisersServiceSpec from './advertisers/advertisers.service.spec';
import industryCategoriesResourceSpec from './industry-categories/industry-categories.resource.spec';
import industryCategoriesServiceSpec from './industry-categories/industry-categories.service.spec';
import usersService from './users/users.service.spec';
import userResource from './users/users.resource.spec';

advertiserResourceSpec(ngModule);
advertisersServiceSpec(ngModule);
industryCategoriesResourceSpec(ngModule);
industryCategoriesServiceSpec(ngModule);
usersService(ngModule);
userResource(ngModule);

export default ngModule;
