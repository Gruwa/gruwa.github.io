import { Routes } from '@angular/router';
import { resolve } from 'path';

import { Error404Component } from './error/404.component';
import { 
    UsersComponent,
    UserComponent
} from './users';
import { 
    UsersService,
    EventRouteActivatorService
} from './shared';


export const appRoutes:Routes = [
    
    { path: 'users', component: UsersComponent },
    // { path: 'events/search', component: ResultComponent },
    { path: 'users/:id', component: UserComponent, canActivate: [EventRouteActivatorService] },
    { path: '404', component: Error404Component },
    { path: '', redirectTo: '/users', pathMatch: 'full' }
    
] 