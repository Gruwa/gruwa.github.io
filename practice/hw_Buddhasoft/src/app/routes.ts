import { Routes } from '@angular/router';
import { resolve } from 'path';

import { Error404Component } from './error/404.component';
import { 
    ProductsComponent,
    ProductComponent
} from './products';
import { EventRouteActivatorService } from './shared';


export const appRoutes:Routes = [
    
    { path: 'products', component: ProductsComponent },
    { path: 'products/:id', component: ProductComponent},
    { path: '404', component: Error404Component },
    { path: '', redirectTo: '/products', pathMatch: 'full' }
    
] 