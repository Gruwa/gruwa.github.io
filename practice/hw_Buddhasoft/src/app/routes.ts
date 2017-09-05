import { Routes } from '@angular/router';
import { resolve } from 'path';

import { Error404Component } from './error/404.component';
import { 
    ProductsComponent,
    ProductComponent,
    NewProductComponent,
    EditProductComponent
} from './products';
import { EventRouteActivatorService } from './shared';


export const appRoutes:Routes = [
    
    { path: 'products/new', component: NewProductComponent },
    { path: 'products/edit', component: EditProductComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'products/:id', component: ProductComponent, canActivate: [EventRouteActivatorService] },
    { path: '404', component: Error404Component},
    { path: '', redirectTo: '/products', pathMatch: 'full' }
    
] 