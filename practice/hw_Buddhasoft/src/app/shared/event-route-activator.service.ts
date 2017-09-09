import { 
    ActivatedRouteSnapshot, 
    CanActivate, 
    Router 
} from '@angular/router';
import { Injectable } from '@angular/core';

import { ProductsService } from './index';

@Injectable()
export class EventRouteActivatorService implements CanActivate{

    constructor(private productsService: ProductsService, private router:Router) { }

    canActivate(route:ActivatedRouteSnapshot) {

        const eventExists = !!this.productsService.getProductId(+route.params['id']);

        if(!eventExists) {
            this.router.navigate(['/404']);
        }

        return eventExists;
    }
}